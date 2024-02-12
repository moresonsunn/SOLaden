// MainActivity.kt
package com.example.ladestation
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
            val username = editTextUsername.text.toString()
            val password = editTextPassword.text.toString()

            login(username, password)
        }
    }

    private fun login(username: String, password: String) {
        val url = "http://192.168.2.100:5500/login.html" // Hier deine Server-IP eintragen

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
                    Toast.makeText(applicationContext, "Login fehlgeschlagen!", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onResponse(call: Call, response: Response) {
                val responseData = response.body?.string()
                runOnUiThread {
                    if (response.isSuccessful && responseData == "Authorized") {
                        Toast.makeText(applicationContext, "Anmeldung erfolgreich!", Toast.LENGTH_SHORT).show()
                        // Hier kannst du die nächste Aktivität starten oder andere Aktionen ausführen
                    } else {
                        Toast.makeText(applicationContext, "Falscher Benutzername oder Passwort!", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        })
    }
}
