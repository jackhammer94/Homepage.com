<?php

//we use void feed to denote the user has deleted all feeds
class FeedsTableSeeder extends Seeder {

	public function run()
	{
		$feeds = array( 
					array('name'=>"void_feed", "logo"=>"nil", "category"=>"nil", "url"=>"nil"),
				    array('name'=>"Yahoo_News_-_India", "logo"=>'http://www.google.com/s2/favicons?domain=https://answers.yahoo.com', "category"=>"news", "url"=>'https://in.news.yahoo.com/rss/india'),
					array('name'=>"Google_News_-_India", "logo"=>'http://www.google.com/s2/favicons?domain=https://www.google.co.in', "category"=>"news", "url"=>'https://news.google.co.in/news?cf=all&ned=in&hl=en&output=rss'),
					array('name'=>"BBC_News_-_India", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bbc.com', "category"=>"news", "url"=>'http://feeds.bbci.co.uk/news/world/asia/india/rss.xml'),
					array('name'=>"Huffington_Post_-_India", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.huffingtonpost.in', "category"=>"news", "url"=>'http://www.huffingtonpost.in/feeds/verticals/india/news.xml'),
					array('name'=>"Indian_Express", "logo"=>'http://www.google.com/s2/favicons?domain=http://indianexpress.com', "category"=>"news", "url"=>'http://indianexpress.com/print/front-page/feed/'),
					array('name'=>"Hindustan_Times", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.hindustantimes.com', "category"=>"news", "url"=>'http://feeds.hindustantimes.com/HT-HomePage-TopStories'),
					array('name'=>"India_Today", "logo"=>'http://www.google.com/s2/favicons?domain=http://indiatoday.intoday.in', "category"=>"news", "url"=>'http://indiatoday.feedsportal.com/c/33614/f/647966/index.rss?http://indiatoday.intoday.in/rss/article.jsp?sid=120'),
					array('name'=>"DNA_India", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.dnaindia.com', "category"=>"news", "url"=>'http://www.dnaindia.com/syndication/rss,catID-0.xml'),
					array('name'=>"CNN_-_World", "logo"=>'http://www.google.com/s2/favicons?domain=https://www.cnn.com', "category"=>"news", "url"=>'http://rss.cnn.com/rss/edition_world.rss'),
					array('name'=>"The_New_York_Times_-_World", "logo"=>'http://www.google.com/s2/favicons?domain=https://www.nytimes.com', "category"=>"news", "url"=>'http://rss.nytimes.com/services/xml/rss/nyt/World.xml'),
					array('name'=>"BBC_News_-_World", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bbc.com', "category"=>"news", "url"=>'http://feeds.bbci.co.uk/news/world/rss.xml'),
					array('name'=>"OneIndia", "logo"=>'http://www.google.com/s2/favicons?domain=https://www.oneindia.com', "category"=>"news", "url"=>'http://news.oneindia.in/rss/news-india-fb.xml'),
					array('name'=>"Firstpost", "logo"=>'http://www.google.com/s2/favicons?domain=https://www.firstpost.com', "category"=>"news", "url"=>'http://feeds.feedburner.com/firstpost/xfJh?utm_source=fp_footer'),

					array('name'=>"Google_News_-_entertainment", "logo"=>'http://www.google.com/s2/favicons?domain=https://www.google.co.in', "category"=>"entertainment", "url"=>'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=e&output=rss'),
					array('name'=>"Yahoo_News_-_movies", "logo"=>'http://www.google.com/s2/favicons?domain=https://answers.yahoo.com', "category"=>"entertainment", "url"=>'https://in.movies.yahoo.com/rss/'),
					array('name'=>"Empire_Online", "logo"=>'http://www.google.com/s2/favicons?domain=https://www.empireonline.com', "category"=>"entertainment", "url"=>'http://rss.feedsportal.com/c/592/f/7507/index.rss'),
					array('name'=>"Cracked", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.cracked.com', "category"=>"entertainment", "url"=>'feeds.feedburner.com/CrackedRSS'),
					array('name'=>"Rollingstone", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.rollingstone.com', "category"=>"entertainment", "url"=>'http://www.rollingstone.com/news.rss'),
					array('name'=>"IGN", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.ign.com', "category"=>"entertainment", "url"=>'http://in.ign.com/feed.xml'),
					array('name'=>"Bollywood_Hungama", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bollywoodhungama.com' , "category"=>"entertainment", "url"=>'http://www.bollywoodhungama.com/rss/news.xml'),
					array('name'=>"BollywoodMDB", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bollywoodmdb.com', "category"=>"entertainment", "url"=>'http://www.bollywoodmdb.com/rss/news'),
					array('name'=>"Glamsham", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.glamsham.com', "category"=>"entertainment", "url"=>'http://feeds.feedburner.com/glamsham/OtlZ'),
					array('name'=>"Tamilstar", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.tamilstar.com', "category"=>"entertainment", "url"=>'http://www.tamilstar.com/english/rss-feed/rss10.php'),
					array('name'=>"Filmibeat_-_Kollywood", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.filmibeat.com', "category"=>"entertainment", "url"=>'http://www.filmibeat.com/rss/filmibeat-tamil-fb.xml'),
					array('name'=>"Filmibeat_-_Bollywood", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.filmibeat.com', "category"=>"entertainment", "url"=>'http://www.filmibeat.com/rss/filmibeat-bollywood-fb.xml'),

					array('name'=>"Google_News_-_business", "logo"=>'http://www.google.com/s2/favicons?domain=https://www.google.com', "category"=>"business", "url"=>'https://news.google.co.in/news?cf=all&ned=in&hl=en&topic=b&output=rss'),
					array('name'=>"BBC_News_-_business", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bbc.com', "category"=>"business", "url"=>'http://feeds.bbci.co.uk/news/business/rss.xml'),
					array('name'=>"Forbes", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.forbes.com', "category"=>"business", "url"=>'http://www.forbes.com/most-popular/feed/'),
					array('name'=>"CNN_Money", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.cnn.com', "category"=>"business", "url"=>'http://rss.cnn.com/rss/money_latest.rss'),
					array('name'=>"Inc_dot_com", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.inc.com', "category"=>"business", "url"=>'http://feeds.inc.com/home/updates'),
					array('name'=>"Business_Insider", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.businessinsider.com', "category"=>"business", "url"=>'http://feeds2.feedburner.com/businessinsider'),
					array('name'=>"Wall_Street_Journal", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.wsj.com', "category"=>"business", "url"=>'http://www.wsj.com/xml/rss/3_7085.xml'),
					array('name'=>"Livemint", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.livemint.com', "category"=>"business", "url"=>'http://www.livemint.com/rss/homepage'),
					array('name'=>"Business_Standard", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.business-standard.com', "category"=>"business", "url"=>'http://www.business-standard.com/rss/home_page_top_stories.rss'),

					array('name'=>"Google_News_-_health", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.google.com', "category"=>"health", "url"=>'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=m&output=rss'),
					array('name'=>"Yahoo_News_-_lifestyle", "logo"=>'http://www.google.com/s2/favicons?domain=http://answers.yahoo.com', "category"=>"health", "url"=>'https://in.lifestyle.yahoo.com/rss/'),
					array('name'=>"Webmd", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.webmd.com', "category"=>"health", "url"=>'http://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC'),
					array('name'=>"BBC_News_-_health", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bbc.com', "category"=>"health", "url"=>'http://feeds.bbci.co.uk/news/health/rss.xml'),
					array('name'=>"Medical_News_Today", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.medicalnewstoday.com', "category"=>"health", "url"=>'http://www.medicalnewstoday.com/rss/featurednews.xml'),
					array('name'=>"Healthline", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.healthline.com', "category"=>"health", "url"=>'http://www.healthline.com/rss/health-news'),
					array('name'=>"Health_dot_com", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.health.com', "category"=>"health", "url"=>'http://www.health.com/health/diet-fitness/feed'),

					array('name'=>"BBC_News_-_technology", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bbc.com', "category"=>"technology", "url"=>'http://feeds.bbci.co.uk/news/technology/rss.xml'),
					array('name'=>"Google_News_-_technology", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.google.com', "category"=>"technology", "url"=>'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=tc&output=rss'),
					array('name'=>"Yahoo_News_-_technology", "logo"=>'http://www.google.com/s2/favicons?domain=http://answers.yahoo.com', "category"=>"technology", "url"=>'https://in.news.yahoo.com/rss/internet'),
					array('name'=>"Gizmodo", "logo"=>'http://www.google.com/s2/favicons?domain=http://gizmodo.com', "category"=>"technology", "url"=>'http://gizmodo.com/index.xml'),
					array('name'=>"Techcrunch", "logo"=>'http://www.google.com/s2/favicons?domain=http://techcrunch.com', "category"=>"technology", "url"=>'http://techcrunch.com/feed/'),
					array('name'=>"Techradar", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.techradar.com', "category"=>"technology", "url"=>'http://techradar.com/rss/news'),
					array('name'=>"The_Next_Web", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.thenextweb.com', "category"=>"technology", "url"=>'http://feeds.feedburner.com/TheNextWebNetwork'),

					array('name'=>"BBC_News_-_science", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bbc.com', "category"=>"science", "url"=>'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml?edition=uk'),
					array('name'=>"Google_News_-_science", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.google.com', "category"=>"science", "url"=>'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=snc&output=rss'),
					array('name'=>"Scientific_American", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.scientificamerican.com', "category"=>"science", "url"=>'http://rss.sciam.com/ScientificAmerican-Global'),
					array('name'=>"NASA", "logo"=>'http://www.google.com/s2/favicons?domain=http://spotthestation.nasa.gov', "category"=>"science", "url"=>'http://www.nasa.gov/rss/dyn/breaking_news.rss'),
					array('name'=>"Science_Daily", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.sciencedaily.com', "category"=>"science", "url"=>'http://feeds.sciencedaily.com/sciencedaily/top_news'),
					array('name'=>"Science_Mag", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.sciencemag.org', "category"=>"science", "url"=>'http://news.sciencemag.org/rss/current.xml'),
					array('name'=>"Live_Science", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.livescience.com', "category"=>"science", "url"=>'http://www.livescience.com/home/feed/site.xml'),

					array('name'=>"Goal_dot_com", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.goal.com', "category"=>"sports", "url"=>'http://www.goal.com/en/feeds/news?fmt=rss'),
					array('name'=>"BBC_News_-_football", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bbc.com', "category"=>"sports", "url"=>'http://feeds.bbci.co.uk/sport/0/football/rss.xml?edition=int'),
					array('name'=>"Bleacherreport", "logo"=>'http://www.google.com/s2/favicons?domain=http://bleacherreport.com', "category"=>"sports", "url"=>'http://bleacherreport.com/articles;feed?tag_id=20'),
					array('name'=>"Espncricinfo", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.espncricinfo.com', "category"=>"sports", "url"=>'http://www.espncricinfo.com/rss/content/story/feeds/6.xml'),
					array('name'=>"Yahoo_News_-_cricket", "logo"=>'http://www.google.com/s2/favicons?domain=http://answers.yahoo.com', "category"=>"sports", "url"=>'https://in.news.yahoo.com/rss/cricket'),
					array('name'=>"BBC_News_-_cricket", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.bbc.com', "category"=>"sports", "url"=>'http://feeds.bbci.co.uk/sport/0/cricket/rss.xml?edition=uk'),
					array('name'=>"Google_News_-_sports", "logo"=>'http://www.google.com/s2/favicons?domain=http://www.google.com', "category"=>"sports", "url"=>'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=s&output=rss'),

					array('name'=>"wikiquote_-_quote_of_the_day", "logo"=>'http://www.google.com/s2/favicons?domain=http://en.wikipedia.org', "category"=>"other", "url"=>'https://en.wikiquote.org/wiki/Main_Page'),
					array('name'=>"wikipedia_-_did_you_know", "logo"=>'http://www.google.com/s2/favicons?domain=http://en.wikipedia.org', "category"=>"other", "url"=>'https://en.wikipedia.org/wiki/Main_Page'),
					array('name'=>"wikipedia_-_on_this_day", "logo"=>'http://www.google.com/s2/favicons?domain=http://en.wikipedia.org', "category"=>"other", "url"=>'https://en.wikipedia.org/wiki/Main_Page')
					);

		foreach($feeds as $feed)
		{
			DB::table('feeds')->insert(
			    array('feed_name' => $feed['name'], 'feed_logo'=>$feed['logo'], 'feed_category'=>$feed['category'], 'feed_url' => $feed['url'])
			);
		}
	}

}