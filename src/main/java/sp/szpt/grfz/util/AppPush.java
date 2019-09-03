package sp.szpt.grfz.util;

import com.gexin.rp.sdk.base.IPushResult;
import com.gexin.rp.sdk.base.impl.AppMessage;
import com.gexin.rp.sdk.http.IGtPush;
import com.gexin.rp.sdk.template.LinkTemplate;
import com.gexin.rp.sdk.template.NotificationTemplate;
import com.gexin.rp.sdk.template.style.Style0;
import com.gexin.rp.sdk.base.impl.SingleMessage;
import com.gexin.rp.sdk.base.impl.Target;

import java.io.IOException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.ArrayList;
import java.util.List;

public class AppPush {
	   //字符串公钥，可以直接保存在客户端
    public  static  final  String  PUBLIC_KEY_STR  =  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhsPL6OSO9vzq9WnCE7xaFO9xO2avYCuuqphp55euPe4+PMNJgeWnkAumCPV0oscrqgLDlnivMclSPFeW/ma0JoaWu9LX1HYfm8p476tLvAOtv4iKKmTsb5GwF7QV4ZAI8Fwr1odTQfllQ701t2CCDEtvSx48+/2x6rtQKeDTL0QIDAQAB";
    //字符串密钥，通常保存在服务器，这里为了方便演示，直接保存在客户端
    public  static  final  String  PRIVATE_KEY_STR  =  "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAOGw8vo5I72/Or1a\n" +
            "cITvFoU73E7Zq9gK66qmGnnl6497j48w0mB5aeQC6YI9XSixyuqAsOWeK8xyVI8V\n" +
            "5b+ZrQmhpa70tfUdh+bynjvq0u8A62/iIoqZOxvkbAXtBXhkAjwXCvWh1NB+WVDv\n" +
            "TW3YIIMS29LHjz7/bHqu1Ap4NMvRAgMBAAECgYB6+3Fr6LcRLqNTi3TE+4PKFlR2\n" +
            "oyaBE3JYCytiQWebSDlyTahV6dNJ7ExSLB4XjsqD/pxmg0panfJ2Bfir75HaJ5+j\n" +
            "BrWlgb0aZT3ljaZvDs3NzipPf4YOibFBe6gWMmKGxLwS9EiaPe7MkrGjwokkSCnS\n" +
            "Jiopw4fULCpr8C3gAQJBAPiC3JTEdQRYhlrOgDc8ap90aAbI0BRE1CWNAOm4UMub\n" +
            "ZG8nPseKAQ4nSjcAFuVzDY4+wOx+O5KjnekoPff0D6kCQQDofgr9IOWNAjcOdjGG\n" +
            "ipzF9eh1jrwN+69ROVHEJn0ymrvY9W/ajbAxvIC+vORWXrqrgkWVW645C6yvqN+U\n" +
            "QRPpAkAHJNvqeutSQKk8GwuciuQVyWbkKwmwS3o9yhvonB/WepUcjOhFHDaDjaWY\n" +
            "hywhVHljSXKKWeakhIeZmEqPwjhhAkBOat0X/fWPNzUMyq7vu2cfmk76/9bMPJ0o\n" +
            "n1XF/Fl0LR65EifVJr9MN1GRhDLcMv1xhfIka5T7JsXrReGLptupAkB46VoY5KJL\n" +
            "hcHkYXe8U32uwvlec2s+6ER8eb7tNsQqqI7XfwSNoiBInfACSaPVANeN4yGBNw0X\n" +
            "cv0Z3OCuwS14";
    
 
/*    //获取公钥
    PublicKey publicKey = RSAUtil.loadPublicKey(PUBLIC_KEY_STR);
    //获取私钥
    PrivateKey privateKey = RSAUtil.loadPrivateKey(PRIVATE_KEY_STR);*/

    
}
