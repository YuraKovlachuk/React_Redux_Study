
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useDispatch, useSelector} from 'react-redux';
import {filterHeroes} from '../../actions';

const HeroesFilters = () => {
    const filters = useSelector(state => state.filters)
    const dispatch = useDispatch();

    const mapButtons = filters.map((item) => {
        switch(item) {
            case 'all':
                return <button className="btn btn-outline-dark active" onClick={() => dispatch(filterHeroes(item))}>Все</button>
            case 'fire':
                return <button className="btn btn-danger" onClick={() => dispatch(filterHeroes(item))}>Вогонь</button>
            case 'water':
                return <button className="btn btn-primary" onClick={() => dispatch(filterHeroes(item))}>Вода</button>
            case 'wind':
                return <button className="btn btn-success" onClick={() => dispatch(filterHeroes(item))}>Вітер</button>
            case 'earth':
                return <button className="btn btn-secondary" onClick={() => dispatch(filterHeroes(item))}>Земля</button>
            default:
                return null
        }
    })

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {mapButtons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;