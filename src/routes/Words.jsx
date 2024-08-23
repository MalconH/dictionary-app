import { useRef } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { LoadingIcon, PlayIcon } from "../components/icons";
import "../components/Words.css";
import { getWords } from "../services/dictionary";

function getFirstAudioSrc(content) {
  const itemWithAudio = content.phonetics.find((item) => item.audio.slice(-3) === "mp3");
  // If no audio source is found itemWithAudio will be undefined
  return itemWithAudio?.audio || null;
}

export async function loader({ params }) {
  const words = await getWords(params.word);
  return { words, word: params.word };
}

export function Words() {
  const { words, word } = useLoaderData();
  const hasDefinition = words?.length > 0;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (!hasDefinition) {
    // TOODO create CustomError for this
    throw new Error({ message: "Unknown word", word: word });
  }

  if (isLoading) {
    return (
      <div className="loading">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <ul className="words-container">
      {words.map((wordContent, index) => (
        <Word key={index} content={wordContent} />
      ))}
    </ul>
  );
}

function Word({ content }) {
  const src = getFirstAudioSrc(content);
  const hasAudio = typeof src === "string";
  const audioRef = useRef();

  const handleClick = () => {
    audioRef.current.play();
  };

  return (
    <li className="word">
      <h2 className="word__title">{content.word}</h2>
      <p className="word__phonetic">{content.phonetic}</p>

      {hasAudio ? (
        <div className="word__audio">
          <button className="play-button" onClick={handleClick} aria-label="Show pronunciation">
            <PlayIcon />
          </button>
          <audio ref={audioRef} src={src}>
            Pronunciation of word {content.phonetic}
          </audio>
        </div>
      ) : (
        ""
      )}

      <Meanings meanings={content.meanings} />
    </li>
  );
}

function Meanings({ meanings }) {
  return (
    <ul className="meanings-list">
      {meanings.map((meaning, index) => (
        <li className="meaning" key={index}>
          <h3 className="meaning__title">{meaning.partOfSpeech}</h3>

          <Definitions definitions={meaning.definitions} />
          <div className="related-words">
            <Synonyms synonyms={meaning.synonyms} />
            <Antonyms antonyms={meaning.antonyms} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Definitions({ definitions }) {
  return (
    <ul className="definitions-list">
      {definitions.map((definition, index) => (
        <li className="definition" key={index}>
          <p className="definition__text">{definition.definition}</p>
        </li>
      ))}
    </ul>
  );
}

function Antonyms({ antonyms }) {
  if (antonyms.length <= 0) return;

  return (
    <div className="related-words__inner">
      <h4 className="related-words__title">Antonyms</h4>
      <p className="related-words__text">
        {antonyms.map((antonym, index) => (
          <Link key={index} to={`/word/${antonym}`}>
            {antonym}
          </Link>
        ))}
      </p>
    </div>
  );
}

function Synonyms({ synonyms }) {
  if (synonyms.length <= 0) return;

  return (
    <div className="related-words__inner">
      <h4 className="related-words__title">Sinonyms</h4>
      <div className="related-words__text">
        {synonyms.map((synonym, index) => (
          <Link key={index} to={`/word/${synonym}`}>
            {synonym}
          </Link>
        ))}
      </div>
    </div>
  );
}
