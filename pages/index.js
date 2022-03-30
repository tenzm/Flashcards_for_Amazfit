import { gettext } from 'i18n'
import { YES_BUTTON, NO_BUTTON, QUESTION_TEXT, ANSWER_TEXT, LEFT_COUNT_TEXT, QA_GROUP, SHOW_BUTTON } from '../utils/styles'

cards = [
  {
    'question': "Hello",
    'answer': "Привет",
    'repeat': 1
  },
  {
    'question': "World",
    'answer': "Мир",
    'repeat': 1
  },
  {
    'question': "Tardigrade",
    'answer': "Тардигрэйд",
    'repeat': 1
  },
  {
    'question': "Inferno",
    'answer': "Инферно",
    'repeat': 1
  }
]
let not_memorized_cards = cards.length

Page({
  build() {
    console.log(gettext('example'))

    const question_text = hmUI.createWidget(hmUI.widget.TEXT, { 
      ...QUESTION_TEXT
     })
     const answer_text = hmUI.createWidget(hmUI.widget.TEXT, { 
      ...ANSWER_TEXT
     })
     const cards_count_left = hmUI.createWidget(hmUI.widget.TEXT, { 
      ...LEFT_COUNT_TEXT,
     })

     
    const button_group = hmUI.createWidget(hmUI.widget.GROUP, {...QA_GROUP})

    const show_button = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...SHOW_BUTTON,
      click_func: function (){
       button_group.setProperty(hmUI.prop.VISIBLE, true)
       answer_text.setProperty(hmUI.prop.VISIBLE, true)
       show_button.setProperty(hmUI.prop.VISIBLE, false)
      }
     })

    button_group.createWidget(hmUI.widget.BUTTON, { ...YES_BUTTON, click_func: () => refresh_cards(question_text, answer_text, button_group, show_button, cards_count_left, true)})
    button_group.createWidget(hmUI.widget.BUTTON, { ...NO_BUTTON, click_func: () => refresh_cards(question_text, answer_text, button_group, show_button, cards_count_left, false) })


    refresh_cards(question_text, answer_text, button_group, show_button, cards_count_left)
  }
})

let c = 0
function refresh_cards(question, answer, button_group, show, cards_count, memorized = false){

  if(memorized){
    not_memorized_cards -= 1
  }

  if(not_memorized_cards <= 0){
    hmUI.showToast({
      text: 'Great\nWork!!!' // Multi-line display support.
    })
  }

  cards_count.setProperty(hmUI.prop.MORE, {
    text: not_memorized_cards.toString() + "/" + cards.length.toString()
  })

  button_group.setProperty(hmUI.prop.VISIBLE, false)
  answer.setProperty(hmUI.prop.VISIBLE, false)
  show.setProperty(hmUI.prop.VISIBLE, true)
  pair = cards[c % cards.length]
  question.setProperty(hmUI.prop.MORE, {
    text: pair['question']
  })
  answer.setProperty(hmUI.prop.MORE, {
    text: pair['answer']
  })
  show.setProperty(hmUI.prop.VISIBLE, true)

  c = c + 1
}
