package com.ibm.musixapp.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.IOUtils;
import org.apache.tomcat.websocket.AuthenticationException;

import org.springframework.mail.MailException;
import javax.mail.MessagingException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.json.JSONObject;
import org.springframework.mock.web.MockMultipartFile;//spring test

import com.ibm.musixapp.exception.UserConflictException;
import com.ibm.musixapp.model.User;

import com.ibm.musixapp.service.MailService;
import com.ibm.musixapp.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
//@CrossOrigin(origins = "http://localhost:8006", maxAge = 3600)
@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;
	// @Autowired
	// private JavaMailSender javaMailSender;
	@Autowired
	private MailService notificationService;

	@PostMapping("/register")       //key of formdata from from frontend is file         //key of formdata from frontend is user
	public ResponseEntity<User> registerUser(@RequestParam("file") MultipartFile file, @RequestParam("user") String user) throws AuthenticationException, IOException {
		ResponseEntity<User> entity = null;
		try {
			String filename = file.getOriginalFilename();
			if(filename.equals("none")) {
			File file1 = new File("src/main/resources/user.png");
		    FileInputStream input = new FileInputStream(file1);
		    file = new MockMultipartFile("file1",
		            file1.getName(), "image/png", IOUtils.toByteArray(input));
			}
			JSONObject jsonObject = new JSONObject(user);
			User u = new User();
			u.setEmail(jsonObject.getString("email"));
			u.setPassword(jsonObject.getString("password"));
			u.setProfileImage(file.getBytes());

			userService.saveUser(u);
		  /*  try {
			this.sendEmail(u.getEmail());
			}
			catch(Exception e) {
				e.printStackTrace();
			}*/
			try {
				notificationService.sendEmail(u);
			} catch (MailException mailException) {
				System.out.println(mailException);
			}
			
			entity = new ResponseEntity<User>(HttpStatus.CREATED);
			
		} catch (UserConflictException e) {
			entity = new ResponseEntity<User>(HttpStatus.CONFLICT);
		} catch (Exception e) {
			entity = new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		return entity;
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User userInfo) {
//		System.out.println(userInfo);
//		System.out.println(userInfo.getEmail());
//		System.out.println(userInfo.getPassword());
		ResponseEntity<?> entity = null;
		try {
			String userName = userInfo.getEmail();
			String password = userInfo.getPassword();
			User user = userService.getByUserIdAndPassword(userName, password);
			
//			***************************************************
			
			
			String token =
					Jwts.builder().
					setId(user.getEmail()).
					setSubject(user.getPassword())
					.setIssuedAt(new Date()).
					signWith(SignatureAlgorithm.HS256,
							"usersecretkey").
					compact();
			
			
			Map<String, String> map1 = new
					HashMap<String, String>();
			map1.put("token", token);
			map1.put("message", "User Successfully logged in");
			map1.put("email",user.getEmail());
			map1.put("id", String.valueOf(user.getId()));
			ResponseEntity<Map<String, String>> response =
					new ResponseEntity<Map<String, String>>(
							map1, HttpStatus.OK);
			
			
			return response;
			
			
//			******************************************************
			
//			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (Exception e) {
			entity = new ResponseEntity<String>("{ \"result\" : \"failed\", \"message\":\"" + e.getMessage() + "\"}",
					HttpStatus.UNAUTHORIZED);
		
		}
		
		return entity;
		
	}
	
	
	@GetMapping("/getUser/{id}")
	public ResponseEntity<?> getUser(@PathVariable("id") int id)
	{
		ResponseEntity<?> rs = null;
		User u=userService.getUserById(id);
		rs = ResponseEntity.status(HttpStatus.OK).body(u);
		return rs;
		
		
	}
	@GetMapping("/getuserimage")
	public User getUserbyid(@RequestParam("user_id")Long id) {//this getUserbyid for user image
		return userService.getUserid(id).get();
	}

	@DeleteMapping("/deleteuser")
	public void deleteUser(@RequestParam(name="user_id")Long id) {
		userService.deleteUser(id);
	}
	
	@PutMapping("/changeprofilepicture")
	public void updateimage(@RequestParam(name="user_id")Long id,@RequestParam("file") MultipartFile file) throws IOException {
		userService.updateProfileImage(file.getBytes(), id);
	}
	
	@PutMapping("/changepassword")
	public void upadepassword(@RequestParam("user_id")Long id, 
			@RequestParam("oldpassword")String oldpassword,
			@RequestParam("newpassword")String newpassword) throws Exception {
		User u = userService.getUserid(id).get();
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if(!encoder.matches(oldpassword, u.getPassword())) {
			throw new Exception("Old Password is Incorrect");
		}
		userService.updatePassword(encoder.encode(newpassword), id);
	}
}
