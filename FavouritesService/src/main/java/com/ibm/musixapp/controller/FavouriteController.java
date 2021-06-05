package com.ibm.musixapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.musixapp.exception.SongAlreadyExistsException;
import com.ibm.musixapp.exception.SongNotExistsException;
import com.ibm.musixapp.model.Comment;
import com.ibm.musixapp.model.Favourite;
import com.ibm.musixapp.service.CommentService;
import com.ibm.musixapp.service.FavService;
//@CrossOrigin(origins = "http://localhost:8006", maxAge = 3600)
@CrossOrigin
@RestController
@RequestMapping("/favourite")
public class FavouriteController {

	@Autowired
	private FavService fs;
	@Autowired
	private CommentService commentService;
	@PostMapping("/saveSong")
	public ResponseEntity<?> saveSong(@RequestBody Favourite b) throws SongAlreadyExistsException
		 {
			ResponseEntity<?> rs = null;
			try {
				Favourite bk = fs.saveModel(b);
				if(bk != null)
					rs = ResponseEntity.
						status(HttpStatus.CREATED).build();
				else
			rs = ResponseEntity.
				status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
			catch(Exception e) {
		rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
			}
			return rs;
		}
	
	@GetMapping("/getSong/{username}")
	public ResponseEntity<?> getSong(@PathVariable("username") String username)
		throws Exception
	{
		ResponseEntity<?> rs = null;
		try {
			List<Favourite> b = fs.getModelByEmail(username);
			rs = ResponseEntity.status(HttpStatus.OK).body(b);
		}
		catch(Exception e) {
			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return rs;
	}
	
	@PostMapping("/removeSong")
	public ResponseEntity<?> removeSong(@RequestBody Favourite b) throws SongNotExistsException
		 {
		
		ResponseEntity<?> rs = null;
		
		try {
			
			
			Favourite bk=fs.removeModel(b);
			
			if(bk != null)
				rs = ResponseEntity.
					status(HttpStatus.CREATED).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
		return rs;
	}
	@PostMapping("/saveCmt")
	public ResponseEntity<?> savecmt(@RequestBody Comment c) {
		ResponseEntity<?> rs = null;

		try {

			Comment comment = commentService.saveComment(c);
			System.out.println(c.toString());
			if (comment != null) {
				rs = ResponseEntity.status(HttpStatus.CREATED).build();
			} else {
				rs = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		} catch (Exception e) {
			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return rs;

	}
	@GetMapping("/getCmt/{artistSongName}")
	public ResponseEntity<?> getcmt(@PathVariable("artistSongName") String artistSongName) {
		ResponseEntity<?> rs = null;

		try {

			List<Comment> cmt = commentService.findBySongName(artistSongName);
			rs = ResponseEntity.status(HttpStatus.OK).body(cmt);

		} catch (Exception e) {
			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return rs;
	}
}