package com.ibm.musixapp.model;


import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="recommendUser")
public class RecomUser {
  
	private String username;
	private String songname;
	private String artist;
	private String url;
	private boolean recommend;
	
	
	public RecomUser(String username, String songname, String artist, String url,boolean recommend) {
		super();
		this.username = username;
		this.songname = songname;
		this.artist = artist;
		this.url = url;
		this.recommend=recommend;
	}
	public boolean isRecommend() {
		return recommend;
	}
	public void setRecommend(boolean recommend) {
		this.recommend = recommend;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getSongname() {
		return songname;
	}
	public void setSongname(String songname) {
		this.songname = songname;
	}
	public String getArtist() {
		return artist;
	}
	public void setArtist(String artist) {
		this.artist = artist;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	@Override
	public String toString() {
		return "Recommend [username=" + username + ", songname=" + songname + ", artist=" + artist + ", url=" + url
				+ "]";
	}
	
	
}


