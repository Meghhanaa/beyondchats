<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::latest()->get();
    }

    public function show($id)
    {
        return Article::findOrFail($id);
    }

    public function store(Request $request)
    {
        return Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'source_url' => $request->source_url,
            'type' => $request->type ?? 'original'
        ]);
    }

    public function destroy($id)
    {
        Article::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }

    public function scrape()
    {
        $url = 'https://beyondchats.com/blogs/';
        $html = Http::get($url)->body();

        preg_match_all('/href="(https:\/\/beyondchats\.com\/blogs\/[^"]+)"/', $html, $matches);
        $links = array_unique($matches[1]);
        $links = array_slice($links, -5);

        foreach ($links as $link) {
            $page = Http::get($link)->body();
            $crawler = new Crawler($page);

            $title = $crawler->filter('title')->text('');
            $content = $crawler->filter('body')->text('');

            Article::create([
                'title' => $title,
                'content' => substr(trim($content), 0, 5000),
                'source_url' => $link,
                'type' => 'scraped'
            ]);
        }

        return response()->json(['message' => 'Articles scraped']);
    }
}
