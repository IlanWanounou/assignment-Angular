package tp1;

import java.util.ArrayList;
import java.util.function.Consumer;

public class StaticModule {

    ArrayList<ModuleEnseignement> array;

    public StaticModule(ArrayList<ModuleEnseignement> array) {
        this.array = array;
    }

    public static class Treatments1 implements Consumer<ModuleEnseignement> {

        @Override
        public void accept(ModuleEnseignement module) {
            System.out.println(String.format("Nom du Module : %s\nDate de création initiale : %d ", module.getDiplomaName(), module.getCreationYear()));
            module.setAnneeCreation(module.getAnneeCreation()+1);
            System.out.println(String.format("Nom du Module : %s\nDate de création modifiée : %d ", module.getDiplomaName() , module.getCreationYear()));
            System.out.println("---------------------------------");
        }
    }


}
