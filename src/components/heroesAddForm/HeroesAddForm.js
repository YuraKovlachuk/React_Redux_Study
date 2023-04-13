import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import {v4 as uuidv4} from 'uuid';
import {fetchFilters, heroesAdded, heroesAdding, heroesAddingError} from "../../slices/stateSlice";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [select, setSelect] = useState('')

    const {filters} = useSelector(state => state)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    const onAddHero = (e) => {
        e.preventDefault()
        dispatch(heroesAdding())
        const newHero = {id: uuidv4(), name, description: text, element: select}
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero))
            .then(item => dispatch(heroesAdded(item)))
            .catch(() => dispatch(heroesAddingError()))
    }

    const mapOptions = filters.map((item) => {
        switch(item) {
            case 'fire':
                return <option value={item}>Вогонь</option>
            case 'water':
                return <option value={item}>Вода</option>
            case 'wind':
                return <option value={item}>Вітер</option>
            case 'earth':
                return <option value={item}>Земля</option>
            default:
                return null
        }
    })

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    value={select}
                    onChange={(e) => {
                        setSelect(e.target.value)
                    }}
                    required
                    className="form-select"
                    id="element"
                    name="element">
                    <option>Я владею элементом...</option>
                    {mapOptions}
                </select>
            </div>

            <button type="submit" className="btn btn-primary" onClick={onAddHero}>Создать</button>
        </form>
    )
}

export default HeroesAddForm;
