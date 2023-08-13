import { useState, useEffect, useRef, DOMElement } from "react";
import dynamic from "next/dynamic";
import styles from "./Hero.module.sass";
import cn from "classnames";
import Image from "../../Image";
import Card from "./Card";
import Mouse from "../../Mouse";
import Modal from "../../Modal";
import Form from "../../Form";
import { useRouter } from "next/router";
const Range = dynamic(() => import("react-slider"), {
  ssr: false,
});

import { images } from "../../../constants/gameplayHero";
import { cards } from "../../../mocks/cardsGameplay";
import Icon from "../../Icon";
import Link from "next/link";

type HeroProps = {};

const Hero = ({}: HeroProps) => {
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [rangeMax, setRangeMax] = useState<number>(0);
  const [visibleModalSale, setVisibleModalSale] = useState<boolean>(false);
  const [blink, setBlink] = useState<boolean>(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current;
    setRangeMax(cards.scrollWidth - cards.offsetWidth);
    cards.scrollLeft = rangeValue;
  }, [rangeValue]);

  const handleListForm = async () => {
    router.push(`/exchange`);
  };

  return (
    <div className={cn(styles.hero)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <h1 className={cn("h1", styles.title)}>Sky Rocket your Leverage</h1>
          <div className={cn("h5", styles.info)}>
            Empowering NFT collateralized loans with AI
          </div>
          <button
            className={cn("button", styles.button, styles.buttonDetails)}
            onClick={handleListForm}
          >
            <p className={styles.btnn}>Transfer</p>
          </button>
        </div>
        <div ref={cardsRef} className={styles.cards}>
          {cards.map((card, index) => (
            <Card className={styles.card} item={card} key={index} />
          ))}
        </div>
        <div className={styles.foot}>
          {/* <Mouse className={styles.mouse} title='Explore the game' /> */}
          <Range
            className={styles.slider}
            thumbClassName={styles.thumb}
            trackClassName={styles.track}
            onChange={(rangeValue: any) => setRangeValue(rangeValue)}
            renderThumb={(props) => (
              <div {...props}>
                <Icon name="pause" fill="#FCFCF9" />
              </div>
            )}
            value={rangeValue}
            step={1}
            min={0}
            max={rangeMax}
          />
        </div>
      </div>
      <div className={styles.background}>
        <div className={styles.lines}></div>
      </div>
      <div className={styles.gradients}></div>

      <div className={styles.images}>
        {images.map((image, index) => (
          <div className={styles.image} key={index}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
