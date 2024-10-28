package com.gilleshelleu

import com.gilleshelleu.models.Formations
import com.gilleshelleu.models.Experiences
import com.gilleshelleu.models.Portfolio

import io.ktor.application.*
import io.ktor.features.ContentNegotiation
import io.ktor.gson.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun main() {
   embeddedServer(Netty, port = 8080) {
        install(ContentNegotiation) { gson {} }
        install(StatusPages) {
            exception<Throwable> { call, cause ->
                call.respond(HttpStatusCode.InternalServerError, cause.localizedMessage)
            }
        }
        configureAuth()
        configureRouting()
    }.start(wait = true)
}



fun Application.configureAuth() {
    val jwtSecret = "mysecret" // Change ce secret pour la production
    val jwtIssuer = "http://localhost:8080/"
    val jwtAudience = "authenticatedUser"

    install(Authentication) {
        jwt("auth-jwt") {
            realm = "Access to formations"
            verifier(
                JWT
                    .require(Algorithm.HMAC256(jwtSecret))
                    .withAudience(jwtAudience)
                    .withIssuer(jwtIssuer)
                    .build()
            )
            validate { credential ->
                if (credential.payload.audience.contains(jwtAudience)) JWTPrincipal(credential.payload) else null
            }
        }
    }
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
                transaction {
                    Formations.insert {
                        it[title] = params["title"] ?: ""
                        it[description] = params["description"] ?: ""
                        it[year] = params["year"]?.toInt() ?: 0
                    }
                }
                call.respondText("Formation ajoutée", status = HttpStatusCode.Created)
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
                            "endDate" to it[Experiences.endDate]?.toString()
                        )
                    }
                }
                call.respond(experiences)
            }

            post {
                val params = call.receive<Map<String, String>>()
                transaction {
                    Experiences.insert {
                        it[company] = params["company"] ?: ""
                        it[role] = params["role"] ?: ""
                        it[startDate] = java.sql.Date.valueOf(params["startDate"])
                        it[endDate] = params["endDate"]?.let { java.sql.Date.valueOf(it) }
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
