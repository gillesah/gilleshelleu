package com.gilleshelleu.models

import org.jetbrains.exposed.sql.Table

object Formations : Table() {
    val id = integer("id").autoIncrement()
    val title = varchar("title", 255)
    val description = text("description")
    val year = integer("year")
    override val primaryKey = PrimaryKey(id)
}
fun connectDatabase() {
    Database.connect("jdbc:postgresql://localhost:5432/gilles_db", driver = "org.postgresql.Driver",
        user = "gilles", password = "password")
    transaction {
        SchemaUtils.create(Formations)
    }
}