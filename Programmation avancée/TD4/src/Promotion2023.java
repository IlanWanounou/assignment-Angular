import java.io.*;

public class Promotion2023 implements java.io.Serializable{

    private Etudiant[] etudiants;

   /* Les champs rootEtudiant et rootAdresse seront
    rajoutés et référenceront respectivement le premier étudiant du tableau et son adresse. */

    private Etudiant rootEtudiant;
    transient   private  Adresse rootAdresse;




    public Promotion2023(Etudiant[] etudiants) {
        this.etudiants = etudiants;
        this.rootAdresse = etudiants[0].getAdresse();
        this.rootEtudiant = etudiants[0];
    }

    public void saveEtudiants(String fileName) throws IOException {
        FileOutputStream support = new FileOutputStream(fileName);
        ObjectOutputStream g_etudiant = new ObjectOutputStream(support);
       // g_etudiant.writeObject(etudiants);
      //  g_etudiant.writeObject(rootEtudiant);
        g_etudiant.writeObject(rootAdresse);
    }

    public void retrieveEtudiants(String fileName) throws IOException, ClassNotFoundException {
        FileInputStream support2 = new FileInputStream(fileName);
        ObjectInputStream g_etudiant2 = new ObjectInputStream(support2);
//        Etudiant[] e1 = (Etudiant[]) g_etudiant2.readObject();
  //      System.out.println(e1[0].getNom());
    //    Etudiant e2 = (Etudiant) g_etudiant2.readObject();
      //  System.out.println(e2.getNom());
        Adresse a1 = (Adresse) g_etudiant2.readObject();
        System.out.println(a1.getVille());
    }



}
