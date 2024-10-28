package com.gilleshelleu.models

import org.jetbrains.exposed.sql.Table

object Experiences : Table() {
    val id = integer("id").autoIncrement()
    val company = varchar("company", 255)
    val role = varchar("role", 255)
    val startDate = date("start_date")
    val endDate = date("end_date").nullable()
    override val primaryKey = PrimaryKey(id)
}
