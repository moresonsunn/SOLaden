import javax.swing.*;
import java.awt.*;

public class MyApp extends JFrame {
    public MyApp() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 400);
        getContentPane().setBackground(Color.WHITE);
        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(MyApp::new);
    }
}
