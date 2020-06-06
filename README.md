# Шаблон для быстрого старта проектов 

* [Как начать проект](readme/how-to-start-project.md)
* [Установка зависимостей и запуск](readme/install-and-start.md)
* [Структура проекта](readme/project-structure.md)


# Palex

Плагины 
	(Валидация)  http://parsleyjs.org 


Если форма отправляется аяксом то запускать следующую функцию после успешной отправки ***globalOpt.formSuccessSent(form)*** - где form - отправленная форма обрамленная в jquery объект 

globalOpt.formResset(form) - очистит текстовые поля, сбросит валидацию.

Формы с классом 'js-validate' валидируются.