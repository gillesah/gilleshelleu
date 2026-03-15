package com.gilleshelleu

import com.gilleshelleu.models.Formations
import com.gilleshelleu.models.Experiences
import com.gilleshelleu.models.Portfolio

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.serialization.gson.*
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation
import io.ktor.http.HttpStatusCode
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import com.gilleshelleu.plugins.configureRouting
import io.ktor.server.plugins.statuspages.StatusPages
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*

fun main() {
   embeddedServer(Netty, port = 8080) {
        install(ContentNegotiation) { gson {} }
        install(StatusPages) {
            exception<Throwable> { call, cause ->
                call.respond(HttpStatusCode.InternalServerError, cause.localizedMessage)
            }
        }
       configureSecurity()

       configureRouting()
    }.start(wait = true)
}


fun connectDatabase() {
    Database.connect(
        url = "jdbc:postgresql://localhost:5432/gilles_db",
        driver = "org.postgresql.Driver",
        user = "gilles",
        password = "password"
    )
}


fun Application.configureSecurity() {
    authentication {
        jwt("auth-jwt") {
            realm = "ktor-sample"
            verifier(JwtConfig.verifier) // JWTConfig is a utility class for token creation
            validate { credential ->
                if (credential.payload.getClaim("username").asString() != "") {
                    JWTPrincipal(credential.payload)
                } else null
            }
        }
    }
}

object JwtConfig {
    private const val secret = "my-secret-key"
    private const val issuer = "ktor.io"
    private const val audience = "ktor-audience"
    private const val validityInMs = 36_000_00 * 24 // 24 hours

    val verifier = JWT.require(Algorithm.HMAC256(secret))
        .withIssuer(issuer)
        .withAudience(audience)
        .build()

    fun generateToken(username: String, isAdmin: Boolean): String = JWT.create()
        .withSubject("Authentication")
        .withIssuer(issuer)
        .withAudience(audience)
        .withClaim("username", username)
        .withClaim("isAdmin", isAdmin)
        .withExpiresAt(Date(System.currentTimeMillis() + validityInMs))
        .sign(Algorithm.HMAC256(secret))
}

fun generateToken(username: String): String {
    val jwtSecret = "mysecret"
    return JWT.create()
        .withAudience("authenticatedUser")
        .withIssuer("http://localhost:8080/")
        .withClaim("username", username)
        .sign(Algorithm.HMAC256(jwtSecret))
}

fun Application.configureRouting() {

    routing {
        post("/login") {
            val post = call.receive<Map<String, String>>()
            val username = post["username"]
            val password = post["password"]

            // Basic example, replace with your real user validation logic
            if (username == "admin" && password == "password") {
                val token = JwtConfig.generateToken(username, isAdmin = true)
                call.respond(mapOf("token" to token))
            } else {
                call.respond(mapOf("error" to "Invalid credentials"))
            }
        }
        // Page d'accueil
        get("/") {
            call.respondText("Bienvenue sur le site de Gilles Helleu !")
        }

        // Routes pour les formations
        route("/formations") {
            get {
                val formations = transaction {
                    Formations.selectAll().map {
                        mapOf(
                            "id" to it[Formations.id],
                            "title" to it[Formations.title],
                            "description" to it[Formations.description],
                            "year" to it[Formations.year]
                        )
                    }
                }
                call.respond(formations)
            }

            post {
                val params = call.receive<Map<String, String>>()
                val title = params["title"] ?: ""
                val description = params["description"] ?: ""
                val year = params["year"]?.toIntOrNull() ?: 0

                transaction {
                    Formations.insert {
                        it[Formations.title] = title
                        it[Formations.description] = description
                        it[Formations.year] = year
                    }
                }
                call.respondText("Formation ajoutée", status = HttpStatusCode.Created)
            }

            put("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, "Invalid ID")
                    return@put
                }

                val params = call.receive<Map<String, String>>()
                val title = params["title"]
                val description = params["description"]
                val year = params["year"]?.toIntOrNull()

                transaction {
                    Formations.update({ Formations.id eq id }) {
                        if (!title.isNullOrEmpty()) {
                            it[Formations.title] = title
                        }
                        if (!description.isNullOrEmpty()) {
                            it[Formations.description] = description
                        }
                        if (year != null) {
                            it[Formations.year] = year
                        }
                    }
                }
                call.respondText("Formation mise à jour", status = HttpStatusCode.OK)
            }
        }


        // Routes pour l'expérience professionnelle
        route("/experiences") {
            get {
                val experiences = transaction {
                    Experiences.selectAll().map {
                        mapOf(
                            "id" to it[Experiences.id],
                            "company" to it[Experiences.company],
                            "role" to it[Experiences.role],
                            "startDate" to it[Experiences.startDate].toString(),
                            "endDate" to it[Experiences.endDate].toString()
                        )
                    }
                }
                call.respond(experiences)
            }

            post {
                val params = call.receive<Map<String, String>>()
                val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd") // Assurez-vous que le format des dates correspond à cette définition

                transaction {
                    Experiences.insert {
                        it[company] = params["company"] ?: ""
                        it[role] = params["role"] ?: ""
                        it[startDate] = LocalDate.parse(params["startDate"], formatter)
                        it[endDate] = params["endDate"]?.let { dateStr -> LocalDate.parse(dateStr, formatter) }
                    }
                }
                call.respondText("Expérience ajoutée", status = HttpStatusCode.Created)
            }
        }

        // Routes pour le portfolio
        route("/portfolio") {
            get {
                val projects = transaction {
                    Portfolio.selectAll().map {
                        mapOf(
                            "id" to it[Portfolio.id],
                            "projectName" to it[Portfolio.projectName],
                            "description" to it[Portfolio.description],
                            "imageUrl" to it[Portfolio.imageUrl],
                            "link" to it[Portfolio.link]
                        )
                    }
                }
                call.respond(projects)
            }

            post {
                val params = call.receive<Map<String, String>>()
                transaction {
                    Portfolio.insert {
                        it[projectName] = params["projectName"] ?: ""
                        it[description] = params["description"] ?: ""
                        it[imageUrl] = params["imageUrl"] ?: ""
                        it[link] = params["link"]
                    }
                }
                call.respondText("Projet ajouté", status = HttpStatusCode.Created)
            }
        }
    }
}
