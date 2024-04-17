import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

const tempMusicData = [
  {
    id: 1,
    title: "Harana",
    artist: "Parokya ni Edgar",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Tabe",
    artist: "Carlos Agassi",
    genre: "Rap",
  },
  {
    id: 3,
    title: "Halik",
    artist: "Kamikaze",
    genre: "Rock",
  },
  {
    id: 4,
    title: "Sulyap",
    artist: "Rico Blanco",
    genre: "Pop Rock",
  },
  {
    id: 5,
    title: "Lakambini",
    artist: "Gloc-9",
    genre: "Hip-Hop",
  },
  {
    id: 6,
    title: "Balisong",
    artist: "Rivermaya",
    genre: "Alternative Rock",
  },
  {
    id: 7,
    title: "Torete",
    artist: "Moonstar88",
    genre: "Indie",
  },
  {
    id: 8,
    title: "Ulan",
    artist: "Cueshé",
    genre: "Pop Rock",
  },
  {
    id: 9,
    title: "Kisapmata",
    artist: "Rivermaya",
    genre: "Rock",
  },
  {
    id: 10,
    title: "Narda",
    artist: "Kamikazee",
    genre: "Punk Rock",
  },
  {
    id: 11,
    title: "Alapaap",
    artist: "Eraserheads",
    genre: "Alternative",
  },
  {
    id: 12,
    title: "Superproxy",
    artist: "Eraserheads ft. Francis M.",
    genre: "Alternative Hip-Hop",
  },
  {
    id: 13,
    title: "Pare Ko",
    artist: "Eraserheads",
    genre: "Rock",
  },
  {
    id: 14,
    title: "Kaleidoscope World",
    artist: "Francis Magalona",
    genre: "Hip-Hop",
  },
  {
    id: 15,
    title: "Ang Huling El Bimbo",
    artist: "Eraserheads",
    genre: "Alternative",
  },
  {
    id: 16,
    title: "Migraine",
    artist: "Moonstar88",
    genre: "Indie",
  },
  {
    id: 17,
    title: "With a Smile",
    artist: "Eraserheads",
    genre: "Alternative",
  },
  {
    id: 18,
    title: "Huwag Mo Nang Itanong",
    artist: "Eraserheads",
    genre: "Rock",
  },
  {
    id: 19,
    title: "Himala",
    artist: "Rivermaya",
    genre: "Rock",
  },
  {
    id: 20,
    title: "Muli",
    artist: "Rivermaya",
    genre: "Alternative",
  },
  {
    id: 21,
    title: "Masaya",
    artist: "Yeng Constantino",
    genre: "Pop",
  },
  {
    id: 22,
    title: "Pag-ibig",
    artist: "Kyla",
    genre: "R&B",
  },
  {
    id: 23,
    title: "Tadhana",
    artist: "Up Dharma Down",
    genre: "Indie",
  },
  {
    id: 24,
    title: "Kung Di Rin Lang Ikaw",
    artist: "December Avenue ft. Moira Dela Torre",
    genre: "Pop",
  },
  {
    id: 25,
    title: "Buwan",
    artist: "Juan Karlos",
    genre: "Alternative",
  },
  {
    id: 26,
    title: "Mundo",
    artist: "IV of Spades",
    genre: "Funk",
  },
  {
    id: 27,
    title: "Dahilan",
    artist: "Barbie Almalbis",
    genre: "Rock",
  },
  {
    id: 28,
    title: "Tagpuan",
    artist: "Moira Dela Torre",
    genre: "Ballad",
  },
  {
    id: 29,
    title: "Di Na Muli",
    artist: "Itchyworms",
    genre: "Alternative",
  },
  {
    id: 30,
    title: "Ikaw at Ako",
    artist: "Moira Dela Torre ft. Jason Marvin",
    genre: "Pop",
  },
];

const tempPlaylist = [
  {
    id: 1,
    title: "Selos",
    artist: "Shaira",
    genre: "Pop",
    rating: 5,
  },
  {
    id: 2,
    title: "Babaero",
    artist: "Hev Abi",
    genre: "Rap",
    rating: 3,
  },
];

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <input
      className="search"
      type="text"
      placeholder="Search music..."
      value={query}
      onChange={handleSearch}
    />
  );
}

function NavBar({ children, onSearch }) {
  return (
    <nav className="container">
      <Logo />
      <Search onSearch={onSearch} />
      {children}
    </nav>
  );
}

function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [filteredMusic, setFilteredMusic] = useState(tempMusicData);
  const [sortOption, setSortOption] = useState("");

  const handleSearch = (searchTerm) => {
    const filtered = music.filter(
      (musicItem) =>
        musicItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        musicItem.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        musicItem.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMusic(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    if (option === "alphabetical") {
      const sortedMusic = [...filteredMusic].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setFilteredMusic(sortedMusic);
    } else if (option === "favorites") {
      const favoritedMusic = filteredMusic.filter((musicItem) =>
        playlist.some((item) => item.id === musicItem.id)
      );
      setFilteredMusic(favoritedMusic);
    }
  };

  const addToPlaylist = (music) => {
    setPlaylist([...playlist, music]);
  };

  return (
    <div>
      <NavBar onSearch={handleSearch}>
        <NumberResult music={filteredMusic} />
        <SortDropdown onSort={handleSort} />
      </NavBar>
      <Main>
        <Box>
          <Music
            music={filteredMusic}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
        </Box>
        <Box>
          <Playlist playlist={playlist} />
        </Box>
      </Main>
    </div>
  );
}
function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={"alhaith.png"}
        style={{ width: "150px", height: "150px", marginRight: "10px" }}
      />
      <h1>Chill Music App</h1>
    </div>
  );
}

function NumberResult({ music }) {
  return (
    <p>
      Found <strong>{music.length}</strong> results
    </p>
  );
}

function Music({ music, playlist, setPlaylist }) {
  const addToPlaylist = (music) => {
    const index = playlist.findIndex((item) => item.id === music.id);
    if (index === -1) {
      setPlaylist([...playlist, music]);
    } else {
      const updatedPlaylist = playlist.filter((item) => item.id !== music.id);
      setPlaylist(updatedPlaylist);
    }
  };

  return (
    <ul>
      <h2>Music List</h2>
      {music.map((musicItem) => (
        <li
          key={musicItem.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <div>
            {musicItem.title} by {musicItem.artist} ({musicItem.genre})
          </div>
          <button
            onClick={() => addToPlaylist(musicItem)}
            style={{ marginLeft: "8px" }}
          >
            {playlist.some((item) => item.id === musicItem.id)
              ? "Unfavorite 💔"
              : "Favorite ❤️"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Box({ children }) {
  return <div className="container">{children}</div>;
}

function Playlist({ playlist }) {
  return (
    <>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((music) => (
          <li key={music.id}>
            <p>
              {music.title} by {music.artist}
              <span></span>
              <span>{music.rating}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function SortDropdown({ onSort }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSort(selectedValue);
  };

  return (
    <select value={selectedOption} onChange={handleSortChange}>
      <option value="">Sort By...</option>
      <option value="alphabetical">Alphabetical</option>
      <option value="favorites">By Favorites</option>
    </select>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

export default App;
