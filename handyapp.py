from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button

class LoginScreen(BoxLayout):
    def __init__(self, **kwargs):
        super(LoginScreen, self).__init__(**kwargs)
        
        self.orientation = 'vertical'
        self.padding = 50

        self.username_label = Label(text='Benutzername:')
        self.username_input = TextInput()

        self.password_label = Label(text='Passwort:')
        self.password_input = TextInput(password=True)

        self.login_button = Button(text='Anmelden', on_press=self.on_login)

        self.add_widget(self.username_label)
        self.add_widget(self.username_input)
        self.add_widget(self.password_label)
        self.add_widget(self.password_input)
        self.add_widget(self.login_button)

    def on_login(self, instance):
        username = self.username_input.text
        password = self.password_input.text

        # Hier könnten Sie die Überprüfung der Anmeldedaten durchführen
        # Zum Beispiel könnten Sie eine Datenbankabfrage verwenden.

        if username == 'IhrBenutzername' and password == 'IhrPasswort':
            print('Erfolgreich angemeldet!')
        else:
            print('Falscher Benutzername oder falsches Passwort.')

class MyApp(App):
    def build(self):
        return LoginScreen()

if __name__ == '__main__':
    MyApp().run()