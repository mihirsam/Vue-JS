<template>
  <div class="question-box-container">
    <b-jumbotron>
      <template v-slot:lead v-if="!over">{{currentQuestion.question}}</template>

      <hr class="my-4" />

      <b-list-group v-if="!over">
        <b-list-group-item
          v-for="(answer, index) in answers"
          :key="index"
          @click="selectAnswer(index)"
          :class="answerClass(index)"
        >{{ answer }}</b-list-group-item>
      </b-list-group>

      <h1>Score: {{score}}</h1>
      <h1 v-if="over">GAME OVER!</h1>
      <b-button v-if="over" variant="success" @click="reloadPage">Restart!</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function
  },
  data() {
    return {
      selectedIndex: null,
      shuffledAnswer: [],
      correctIndex: null,
      answered: false,
      score: 0,
      over: ""
    };
  },

  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.answered = false;
        this.selectedIndex = null;
        this.shuffleAnswer();
      }
    }
  },

  methods: {
    reloadPage() {
      window.location.reload();
    },
    selectAnswer(index) {
      this.selectedIndex = index;

      let isCorrect = false;

      if (this.selectedIndex == this.correctIndex) {
        isCorrect = true;
        this.score++;
      } else {
        this.over = true;
      }

      this.increment(isCorrect);
      this.answered = true;

      setTimeout(this.next, 2000);
    },

    shuffleAnswer() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ];
      this.shuffledAnswer = _.shuffle(answers);
      this.correctIndex = this.shuffledAnswer.indexOf(
        this.currentQuestion.correct_answer
      );
    },

    submitAnswer() {
      let isCorrect = false;

      if (this.selectedIndex == this.correctIndex) {
        isCorrect = true;
      }

      this.increment(isCorrect);
      this.answered = true;
    },

    answerClass(index) {
      let answerClass = "";

      if (!this.answered && this.selectedIndex == index) {
        answerClass = "selected";
      } else if (this.answered && this.correctIndex == index) {
        answerClass = "correct";
      } else if (
        this.answered &&
        this.selectedIndex === index &&
        this.correctIndex !== index
      ) {
        answerClass = "incorrect";
      }

      return answerClass;
    }
  },
  computed: {
    answers() {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      return answers;
    }
  }
};
</script>

<style scoped>
.list-group {
  margin-bottom: 15px;
}

.list-group-item:hover {
  background: yellow;
}

.btn {
  margin: 0 5px;
}

.selected {
  background-color: yellow;
}

.correct {
  background-color: green;
}

.incorrect {
  background-color: red;
}
</style>