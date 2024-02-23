// MainActivity.kt
package com.example.ladestation
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import okhttp3.*
import java.io.IOException

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.xml.activity_main)

        val editTextUsername = findViewById<EditText>(R.id.editTextUsername)
        val editTextPassword = findViewById<EditText>(R.id.editTextPassword)
        val buttonLogin = findViewById<Button>(R.id.buttonLogin)

        buttonLogin.setOnClickListener {
            val username = editTextUsername.text.toString().trim()
            val password = editTextPassword.text.toString().trim()

            if (username.isNotEmpty() && password.isNotEmpty()) {
                login(username, password)
            } else {
                Toast.makeText(applicationContext, "Bitte Benutzername und Passwort eingeben!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun login(username: String, password: String) {
        val url = "http://localhost/login.html" 

        val client = OkHttpClient()

        val requestBody = FormBody.Builder()
            .add("username", username)
            .add("password", password)
            .build()

        val request = Request.Builder()
            .url(url)
            .post(requestBody)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                e.printStackTrace()
                runOnUiThread {
                    Toast.makeText(applicationContext, "Netzwerkfehler beim Anmelden!", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onResponse(call: Call, response: Response) {
                val responseData = response.body?.string()
                runOnUiThread {
                    if (response.isSuccessful && responseData == "Authorized") {
                        Toast.makeText(applicationContext, "Anmeldung erfolgreich!", Toast.LENGTH_SHORT).show()
                        // Weiterleitung zur nächsten Aktivität bei erfolgreicher Anmeldung
                        val intent = Intent(this@MainActivity, LadestationenActivity::class.java).apply {
                            putExtra("username", username)
                        }
                        startActivity(intent)
                        finish()
                    } else {
                        Toast.makeText(applicationContext, "Falscher Benutzername oder Passwort!", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        })
    }
}
