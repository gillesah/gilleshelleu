
val kotlin_version: String by project
val logback_version: String by project

plugins {
    kotlin("jvm") version "2.0.21"
    id("io.ktor.plugin") version "3.0.0"
}

group = "com.gilleshelleu"
version = "0.0.1"

application {
    mainClass.set("com.gilleshelleu.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:2.3.4")
    implementation("io.ktor:ktor-server-netty-jvm:2.3.4")
    implementation("io.ktor:ktor-server-auth-jvm:2.3.4")
    implementation("io.ktor:ktor-server-auth-jwt-jvm:2.3.4")
    implementation("org.jetbrains.exposed:exposed-core:0.39.2")
    implementation("org.jetbrains.exposed:exposed-dao:0.39.2")
    implementation("org.jetbrains.exposed:exposed-jdbc:0.39.2")
    implementation("org.postgresql:postgresql:42.5.0")
    implementation("io.ktor:ktor-serialization-gson-jvm:2.3.4")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:2.3.4")
}
