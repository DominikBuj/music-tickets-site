package pl.dominikb.iwa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.dominikb.iwa.models.Role;
import pl.dominikb.iwa.models.RoleName;
import pl.dominikb.iwa.models.User;
import pl.dominikb.iwa.repositories.RoleRepository;
import pl.dominikb.iwa.repositories.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Component
public class StartupSetup implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        addSuperadmin();
        addSuperuser();
    }

    private void addSuperadmin() {
        User user = new User("superadmin", passwordEncoder.encode("superadmin"));
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Fail -> Cause: Admin Role not found.")));
        user.setRoles(roles);
        userRepository.save(user);
    }

    private void addSuperuser() {
        User user = new User("superuser", passwordEncoder.encode("superuser"));
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Fail -> Cause: User Role not found.")));
        user.setRoles(roles);
        userRepository.save(user);
    }
}
