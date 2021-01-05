package config;

import model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import service.UserService;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserService userService;

    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        List<UserRole> userRoles = userService.getUserRoleByUser(s);
        model.User modelUser = userRoles.get(0).getUser();

        List<GrantedAuthority> list = new ArrayList<>();
        for (final UserRole userRole : userRoles) {
            GrantedAuthority role = new GrantedAuthority() {
                @Override
                public String getAuthority() {
                    return userRole.getRole().getAuthority();
                }
            };
            list.add(role);
        }

        User user = new User(s, modelUser.getPassword(), true, true, true, true, list );

        return user;
    }
}
