from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
import sqlite3

class LoginScreen(BoxLayout):
    def __init__(self, **kwargs):
        super(LoginScreen, self).__init__(**kwargs)
        
        self.orientation = 'vertical'
        self.padding = 50

        self.username_label = Label(text='Nutzer ID:')
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

        conn = sqlite3.connect('SOLaden.db')
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM nutzer WHERE nutzer_id=? AND passwort=?", (username, password))
        result = cursor.fetchone()

        if result:
            #url = 
            print('Erfolgreich angemeldet!')
        else:
            print('Falscher Benutzername oder falsches Passwort.')

        conn.close()

class LadestationenScreen(BoxLayout):
    def __init__(self, **kwargs):
        super(LadestationenScreen, self).__init__(**kwargs)
        
        self.orientation = 'vertical'
        self.padding = 50

        self.ladestationen_label = Label(text='Ladestationen')
        self.add_widget(self.ladestationen_label)

        self.ladestationen_button = Button(text='Ladestationen', on_press=self.on_ladestationen)
        self.add_widget(self.ladestationen_button)

    def on_ladestationen(self, instance):
        print('Ladestationen')

class MyApp(App):
    def build(self):
        return LoginScreen()
    
    def change_screen(self, screen_name):
        if screen_name == 'ladestationen':
            self.root = LadestationenScreen()
        else:
            self.root = LoginScreen()


if __name__ == '__main__':
    MyApp().run()