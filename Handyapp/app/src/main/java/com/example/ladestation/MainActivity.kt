package com.example.ladestation

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.ladestation.databinding.ActivityMainBinding
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btn_login.setOnClickListener {
            val username = et_username.text.toString()
            val password = et_password.text.toString()

            // Hier können Sie die Logik zur Überprüfung von Benutzername und Passwort hinzufügen
            if (username == "admin" && password == "12345") {
                Toast.makeText(this, "Login successful", Toast.LENGTH_SHORT).show()
                // Führen Sie hier die Weiterleitung zur Hauptaktivität durch
            } else {
                Toast.makeText(this, "Login failed", Toast.LENGTH_SHORT).show()
            }
        }
    }
}