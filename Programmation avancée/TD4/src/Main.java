
import java.io.*;
import java.util.Date;

public class Main {
    public static void main(String[] args) throws IOException, ClassNotFoundException {

        Etudiant[] etudiants = new Etudiant[10];
        for (int i = 0; i < etudiants.length; i++) {
            etudiants[i] = new Etudiant("nom" + i, "prenom" + i, 20 + i, new Date(), "000000000" + i);
        }

        for (int i = 0; i < etudiants.length; i++) {
            etudiants[i].setParents(new Personne[]{new Personne("nomParent" + i, "prenomParent" + i, 40 + i)});
            etudiants[i].setAdresse(new Adresse("ville" + i, "rue" + i, i, true));
        }

     /*   FileOutputStream support = new FileOutputStream("f_etudiant");

        ObjectOutputStream g_etudiant = new ObjectOutputStream(support);

        g_etudiant.writeObject(etudiants);

        FileInputStream support2 = new FileInputStream("f_etudiant");
        ObjectInputStream g_etudiant2 = new ObjectInputStream(support2);

        Etudiant e1 = (Etudiant) g_etudiant2.readObject();
        System.out.println(e1.getNom());*/



        Promotion2023 promotion = new Promotion2023(etudiants);

        promotion.saveEtudiants("f_etudiant");
        promotion.retrieveEtudiants("f_etudiant");
    }
}