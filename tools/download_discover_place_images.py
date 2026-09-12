import ssl
import sys
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Assets" / "Image" / "Discover" / "Places"
OUT.mkdir(parents=True, exist_ok=True)

ITEMS = {
    "Lille": {
        "must": ["Grand Place Vieille Bourse Lille", "Palais des Beaux-Arts Lille", "Hospice Comtesse Vieux Lille"],
        "food": ["La Petite Table Estaminet Vieux Lille", "La Capsule Lille bar", "Bioburger Lille"],
    },
    "Roubaix": {
        "must": ["La Piscine Roubaix museum", "La Manufacture Roubaix textile museum", "Parc Barbieux Roubaix"],
        "food": ["La Nonna Ristorante Roubaix", "Mercado Negro Roubaix rooftop", "Garden Food Roubaix"],
    },
    "Villeneuve-dAscq": {
        "must": ["LaM Villeneuve d'Ascq museum", "Forum departemental des Sciences Villeneuve d'Ascq", "Parc du Heron Villeneuve d'Ascq"],
        "food": ["Rosso Bianco Villeneuve d'Ascq restaurant", "Ninkasi Lille Lezennes", "Dubble Lille Pilaterie"],
    },
    "Dunkerque": {
        "must": ["Beffroi Saint Eloi Dunkerque", "Musee Maritime Portuaire Dunkerque", "Malo les Bains Dunkerque"],
        "food": ["Le Taj Mahal Dunkerque restaurant", "Kilimanjaro Dunkerque bar", "Crepe Touch Dunkerque"],
    },
    "Bergues": {
        "must": ["Remparts Bergues Vauban", "Grand Place Beffroi Bergues", "Bienvenue chez les Ch'tis Bergues lieux tournage"],
        "food": ["La Taverne Vauban Bergues", "Cafe de la Poste Bergues", "Snack Friterie Bergues"],
    },
    "Bruges": {
        "must": ["Markt Belfry Bruges", "Rozenhoedkaai Bruges canals", "Groeninge Museum Bruges"],
        "food": ["Den Amand Bruges restaurant", "Noble Bruges wine cocktail bar", "Bohemian Burgers Bruges"],
    },
    "Bruxelles": {
        "must": ["Grand Place Brussels Royal Galleries", "Atomium Brussels", "Magritte Museum Brussels"],
        "food": ["Le Conteur Brussels restaurant", "L'Archiduc Brussels bar", "Pois Chiche Brussels"],
    },
    "Courtrai": {
        "must": ["Broel Towers Kortrijk", "Beguinage Kortrijk", "Grote Markt Belfry City Hall Kortrijk"],
        "food": ["Nude Kortrijk restaurant", "Bar Memoir Kortrijk", "Paul's Boutique Kortrijk"],
    },
    "Gand": {
        "must": ["Gravensteen Ghent castle", "St Bavo Cathedral Ghent", "Graslei Korenlei Ghent"],
        "food": ["Royal India Restaurant Ghent", "Ona Ghent wine bar", "Greenway Ghent"],
    },
    "Tournai": {
        "must": ["Notre-Dame Cathedral Belfry Tournai", "Musee des Beaux Arts Tournai", "Pont des Trous Grand Place Tournai"],
        "food": ["Cannelle et Safran Tournai", "Le Greco OenoBar Tournai", "Black White Burger Tournai"],
    },
}

SLUGS = {
    "Villeneuve-dAscq": "villeneuve",
    "Bruxelles": "bruxelles",
    "Dunkerque": "dunkerque",
    "Courtrai": "courtrai",
    "Bergues": "bergues",
    "Roubaix": "roubaix",
    "Tournai": "tournai",
    "Bruges": "bruges",
    "Lille": "lille",
    "Gand": "gand",
}


def image_url(query: str) -> str:
    encoded = urllib.parse.quote(query)
    return f"https://tse1.mm.bing.net/th?q={encoded}&w=640&h=420&c=7&rs=1&p=0&o=5&pid=1.7"


def download(destination: Path, query: str) -> tuple[int | None, str | None]:
    request = urllib.request.Request(image_url(query), headers={"User-Agent": "Mozilla/5.0"})
    context = ssl._create_unverified_context()
    try:
        with urllib.request.urlopen(request, context=context, timeout=20) as response:
            data = response.read()
        if len(data) < 2048:
            raise ValueError(f"too small: {len(data)} bytes")
        destination.write_bytes(data)
        return len(data), None
    except Exception as error:
        return None, str(error)


def main() -> int:
    failures = []
    for city, groups in ITEMS.items():
        slug = SLUGS[city]
        for group, queries in groups.items():
            for index, query in enumerate(queries, start=1):
                destination = OUT / f"{slug}-{group}-{index}.jpg"
                size, error = download(destination, query)
                if size:
                    print(f"ok {destination.name} {size}", flush=True)
                else:
                    failures.append((destination.name, error))
                    print(f"failed {destination.name}: {error}", flush=True)
    print(f"summary {60 - len(failures)} ok, {len(failures)} failed", flush=True)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
