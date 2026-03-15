package com.gilleshelleu.plugins

import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.http.HttpStatusCode
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import com.gilleshelleu.models.Formations
import com.gilleshelleu.models.Experiences
import com.gilleshelleu.models.Portfolio
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.gilleshelleu.connectDatabase


fun generateToken(username: String): String {
    val jwtSecret = "mysecret"
    return JWT.create()
        .withAudience("authenticatedUser")
        .withIssuer("http://localhost:8080/")
        .withClaim("username", username)
        .sign(Algorithm.HMAC256(jwtSecret))
}

fun Application.configureRouting() {
    connectDatabase()

    routing {
        // Route de connexion
        post("/login") {
            val credentials = call.receive<Map<String, String>>()
            val username = credentials["username"]
            val password = credentials["password"]

            // Remplace par une validation réelle
            if (username == "admin" && password == "password") {
                val token = generateToken(username)
                call.respond(mapOf("token" to token))
            } else {
                call.respond(HttpStatusCode.Unauthorized, "Invalid credentials")
            }
        }

        // Routes protégées pour les formations
        authenticate("auth-jwt") {
            get("/formations") {
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

            put("/formations/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                if (id == null) {
                    call.respond(HttpStatusCode.BadRequest, "Invalid ID")
                    return@put
                }

                val updatedFormation = call.receive<Map<String, Any>>()
                val title = updatedFormation["title"] as? String
                val description = updatedFormation["description"] as? String
                val year = updatedFormation["year"] as? Int

                transaction {
                    fun updateFormation(id: Int?, title: String?, description: String?, year: Int?) {
                        if (id != null) {
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
                        } else {
                            println("Invalid ID for update.")
                        }
                    }

                }
                call.respond(HttpStatusCode.OK, "Formation updated")
            }
        }
    }
}
