package com.gilleshelleu.models

import org.jetbrains.exposed.sql.Table

object Portfolio : Table() {
    val id = integer("id").autoIncrement()
    val projectName = varchar("project_name", 255)
    val description = text("description")
    val imageUrl = varchar("image_url", 255)
    val link = varchar("link", 255).nullable()
    override val primaryKey = PrimaryKey(id)
}
