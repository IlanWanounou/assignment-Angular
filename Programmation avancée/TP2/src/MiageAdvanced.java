import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.TYPE;

@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, MODULE, PARAMETER, TYPE})
public @interface MiageAdvanced {
    enum Etat {draftPartiel, draftComplet, versionFinalise}
    public Etat etat() default Etat.draftPartiel;
    public boolean test() default false;
    public boolean automatisation() default false;

}

