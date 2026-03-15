package com.gilleshelleu.models

import org.jetbrains.exposed.sql.Table



object Formations : Table() {
    val id = integer("id").autoIncrement()
    val title = varchar("title", 255)
    val description = text("description")
    val year = integer("year")
    override val primaryKey = PrimaryKey(id)
}
