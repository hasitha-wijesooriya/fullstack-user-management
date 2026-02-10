package com.example.user_system.user_management_system_api.util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordManager {

    public static String hash(String simpleText){
        return BCrypt.hashpw(simpleText, BCrypt.gensalt());
    }

    public static boolean check(String password, String hashedPassword){
        if (BCrypt.checkpw(password, hashedPassword))
            return true;
        else
            return false;
    }

}
