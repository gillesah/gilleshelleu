
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
    implementation("io.ktor:ktor-server-core:2.3.4")
    implementation("io.ktor:ktor-server-netty:2.3.4")
    implementation("io.ktor:ktor-server-auth:2.3.4")
    implementation("io.ktor:ktor-server-auth-jwt:2.3.4")
    implementation("io.ktor:ktor-serialization-gson:2.3.4")
    implementation("io.ktor:ktor-server-content-negotiation:2.3.4")
    implementation("org.jetbrains.exposed:exposed-core:0.39.2")
    implementation("org.jetbrains.exposed:exposed-dao:0.39.2")
    implementation("org.jetbrains.exposed:exposed-jdbc:0.39.2")
    implementation("io.ktor:ktor-server-status-pages:3.0.1")
    implementation("org.jetbrains.exposed:exposed-java-time:0.39.2")
    implementation("org.postgresql:postgresql:42.5.0")
    implementation("com.auth0:java-jwt:4.4.0")
    testImplementation("io.ktor:ktor-server-tests:2.3.4")
    testImplementation("org.jetbrains.kotlin:kotlin-test")
}
