import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.Base64;

public class Main {
    public static final String SSHA = "SSHA";
    public static final String SMD5 = "SMD5";
    private static final String HSSHA = "{SSHA}";
    private static final String SHA1 = "SHA-1";
    private static final Random random = new SecureRandom();

    public static void main(String[] args) {
        String password = args[0];
        String digestalg = SHA1;
        String prefix = HSSHA;
        byte[] salt = new byte[8];

        synchronized (random) {
            random.nextBytes(salt);
        }

        byte[] hash = digestWithSalt(password, salt, digestalg);
        byte[] bytes = new byte[hash.length + salt.length];

        System.arraycopy(hash, 0, bytes, 0, hash.length);
        System.arraycopy(salt, 0, bytes, hash.length, salt.length);

        String res = prefix + Base64.getEncoder().encodeToString(bytes);

        System.out.print(res);
    };

    public static byte[] digestWithSalt(String password, byte[] salt, String algorithm) {
        try {
            MessageDigest md = MessageDigest.getInstance(algorithm);
            md.update(password.getBytes("UTF-8"));
            md.update(salt);
            return md.digest();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(algorithm, e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    };
}