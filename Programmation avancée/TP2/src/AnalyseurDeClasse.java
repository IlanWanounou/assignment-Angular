import java.lang.reflect.*;
import java.io.*;
import java.util.Arrays;

public class AnalyseurDeClasse {


    public static void analyseClasse(String nomClasse) throws ClassNotFoundException {
        Class cl = AnalyseurDeClasse.getClasse(nomClasse);

        afficheEnTeteClasse(cl);

        System.out.println();
        afficheInnerClasses(cl);

        System.out.println();
        afficheAttributs(cl);

        System.out.println();
        afficheConstructeurs(cl);

        System.out.println();
        afficheMethodes(cl);

        // L'accolade fermante de fin de classe !
        System.out.println("}");
    }


    /** Retourne la classe dont le nom est pass� en param�tre */
    public static Class getClasse(String nomClasse) throws ClassNotFoundException {
        return Class.forName(nomClasse);
    }

    /** Cette m�thode affiche par ex "public class C1 extends C2 implements I1, I2 {" */
    public static void afficheEnTeteClasse(Class cl) {

        System.out.print(Modifier.toString(cl.getModifiers()) + " ");

        System.out.print(cl.getName());


        // R�cup�ration de la superclasse si elle existe (null si cl est le type Object)
        Class supercl = cl.getSuperclass();

                // On ecrit le "extends " que si la superclasse est non nulle et diff�rente de Object
                if(supercl != null) {
                System.out.print(" extends " + supercl.getName());
                }
                // Affichage des interfaces que la classe implemente
                Class[] interfaces = cl.getInterfaces();
        for (Class anInterface : interfaces) {
            System.out.print(" implements " + anInterface.getName());
        }
                // Accolade ouvrante de d�but de classe
                System.out.print(" {\n");
    }

    /** Cette m�thode affiche les classes imbriqu�es statiques ou pas
     A faire apr�s avoir fait fonctionner le reste */
    public static void afficheInnerClasses(Class cl) {
       System.out.println(Arrays.toString(cl.getDeclaredClasses()));
        System.out.println(cl.getDeclaringClass());
    }

    public static void afficheAttributs(Class cl) {
        for (Field field : cl.getDeclaredFields()) {
            System.out.println(field.toString() + " " + Arrays.toString(field.getDeclaredAnnotations()));
        }
    }

    public static void afficheConstructeurs(Class cl) {
        for (Constructor constructor : cl.getDeclaredConstructors()) {
            System.out.println(constructor.toString() + " " + Arrays.toString(constructor.getDeclaredAnnotations()));
        }
        System.out.println("{}");

    }

    @MiageAdvanced()
    public static void afficheMethodes(Class cl) {
        for (Method method : cl.getDeclaredMethods()) {
            System.out.println(method.toString() + " " + Arrays.toString(method.getDeclaredAnnotations()));
        }

        System.out.println("{}");
    }

/* Facultatif au moins dans un premier temps */
/* tester le programme en passant un nom de classe complet en param�tre
     Modifier la m�thode "main" en cons�quence
*/
public static String litChaineAuClavier() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        return br.readLine();
        }

public static void main(String[] args) {
        boolean ok = false;

        while(!ok) {
        try {
        System.out.print("Entrez le nom d'une classe (ex : java.util.Date): ");
        String nomClasse = litChaineAuClavier();

        analyseClasse(nomClasse);
        ok = true;
        } catch(ClassNotFoundException e) {
        System.out.println("Classe non trouvée.");
        }catch(IOException e) {
        System.out.println("Erreur d'E/S!");
        }
        }
        }
        }


