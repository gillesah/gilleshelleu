package com.example.plugins

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

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
                    Formations.update({ Formations.id eq id }) {
                        it[Formations.title] = title ?: it[Formations.title]
                        it[Formations.description] = description ?: it[Formations.description]
                        it[Formations.year] = year ?: it[Formations.year]
                    }
                }
                call.respond(HttpStatusCode.OK, "Formation updated")
            }
        }
    }
}
