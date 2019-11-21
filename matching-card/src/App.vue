<template>
  <div id="app">
    <div class="info">
      <div><span class="label">Time:</span><span class="value">{{ time }} </span></div>
      <div><span class="label">Turns:</span><span class="value">{{ turns }} </span></div>
    </div>
    <div class="cards">
      <div class="card" 
      v-for="(card, index) in cards" 
      :key="index"
      :class="{ flipped: card.flipped, found: card.found }"
        @click="flipCard(card)">
        <div class="back"></div>
        <div class="front" :style="{ backgroundImage:  `url(${card.image})` }"></div>
      </div>
    </div>
    <div class="splash" v-if="showSplash">
      <div class="overlay"></div>
      <div class="content">
        <div class="title">You won!</div>
        <div class="score">Score: {{ score }}</div><button class="newGame" @click="resetGame()">New game</button>
      </div>
    </div>
  </div>
</template>


<script>
import _ from "lodash";
import * as moment from "moment/moment";
import h_jack from './assets/h_jack.svg';
import c_queen from './assets/c_queen.svg';
import d_queen from './assets/d_queen.svg';
import h_king from './assets/h_king.svg';
import h_queen from './assets/h_queen.svg';
import s_king from './assets/s_king.svg';
import d_king from './assets/d_king.svg';

export default {
  name: "app",
	
	data() {
    return {
		showSplash: false,
		cards: [],
		started: false,
		startTime: 0,
		turns: 0,
		flipBackTimer: null,
		timer: null,
		time: "--:--",
		score: 0,
    CardTypes: [
	{ name: "hjack", image: h_jack },
	{ name: "cqueen", image: c_queen },
	{ name: "dqueen", image: d_queen },
	{ name: "hking", image: h_king },
	{ name: "hqueen", image: h_queen },
	{ name: "sking", image: s_king },
  { name: "dking", image: d_king }
]
	}},
	
	methods: {
    shuffleCards(){
	let cards = [].concat(_.cloneDeep(this.CardTypes), _.cloneDeep(this.CardTypes));
	return _.shuffle(cards);
},
		resetGame() {
			this.showSplash = false;
			let cards = this.shuffleCards();
			this.turns = 0;
			this.score = 0;
			this.started = false;
			this.startTime = 0;
			
			_.each(cards, (card) => {
				card.flipped = false;
				card.found = false;
			});
			
			this.cards = cards;
		},
		
		flippedCards() {
			return _.filter(this.cards, card => card.flipped);
		},
		
		sameFlippedCard() {
			let flippedCards = this.flippedCards();
			if (flippedCards.length == 2) {
				if (flippedCards[0].name == flippedCards[1].name)
					return true;
			}
		},
		
		setCardFounds() {
			_.each(this.cards, (card) => {
				if (card.flipped)
					card.found = true;
			});
		},
		
		checkAllFound() {
			let foundCards = _.filter(this.cards, card => card.found);
			if (foundCards.length == this.cards.length)
				return true;
		},
		
		startGame() {
			this.started = true;
			this.startTime = moment();
			
			this.timer = setInterval(() => {
				this.time = moment(moment().diff(this.startTime)).format("mm:ss");
			}, 1000);
		},
		
		finishGame() {
			this.started = false;
			clearInterval(this.timer);
			let score = 1000 - (moment().diff(this.startTime, 'seconds') - this.CardTypes.length * 5) * 3 - (this.turns - this.CardTypes.length) * 5;
			this.score = Math.max(score, 0);
			this.showSplash = true;
		},
		
		flipCard(card) {
			if (card.found || card.flipped) return;
			
			if (!this.started) {
				this.startGame();
			}
			
			let flipCount = this.flippedCards().length;
			if (flipCount == 0) {
				card.flipped = !card.flipped;
			}
			else if (flipCount == 1) {
				card.flipped = !card.flipped;
				this.turns += 1;

				if (this.sameFlippedCard()) {
					// Match!
					this.flipBackTimer = setTimeout( ()=> {
						this.clearFlipBackTimer();
						this.setCardFounds();
						this.clearFlips();

						if (this.checkAllFound()) {
							this.finishGame();
						}	

					}, 200);
				}
				else {
					// Wrong match
					this.flipBackTimer = setTimeout( ()=> {
						this.clearFlipBackTimer();
						this.clearFlips();
					}, 1000);
				}
			}
		},
		
		clearFlips() {
			_.map(this.cards, card => card.flipped = false);
		},
		
		
		clearFlipBackTimer() {
			clearTimeout(this.flipBackTimer);
			this.flipBackTimer = null;
		}
	},
	
	created() {
		this.resetGame();
	}
}
</script>

