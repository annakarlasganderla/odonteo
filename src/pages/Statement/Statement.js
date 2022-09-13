import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import fetchApi from '../../utils/fetch';
import { handleChange } from '../../utils/handleChange';
import './Statement.css';

function Statement() {
  const [datesOfStatement, setDatesOfStatement] = useState({});
  const [renderStatement, setRenderStatement] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const navigate = useNavigate();
  const [incomeDetails, setIncomeDetails] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function getIncome() {
      const options = {
        method: 'GET'
      }
  
      const { income } = await fetchApi(`https://odonteo-backend.herokuapp.com/income/${user.id}`, options, true);
  
      setIncomeDetails(income);
    }

    getIncome();
  }, [user]);

  function checkIncome() {
    const { beginningDate, endingDate } = datesOfStatement;
    setTotalIncome(0);

    incomeDetails.forEach(({ dates, installmentValue }) => {
      const datesInInterval = JSON.parse(dates).filter((date) => Date.parse(date) >= Date.parse(beginningDate) && Date.parse(date) <= Date.parse(endingDate));
      setTotalIncome((oldState) => Math.floor(oldState + (datesInInterval.length * installmentValue) * 100) / 100);
    });

    setRenderStatement(true);
  }

  return (
    <main>
      <form>
        <label htmlFor='beginning-date'>
          Data de início:
          <input
            className='form-input date'
            id='beginning-date'
            name='beginningDate'
            type='date'
            onChange={(e) => handleChange(e, setDatesOfStatement)}
          />
        </label>
        <label htmlFor='ending-date'>
          Data de fim:
          <input
            className='form-input date'
            id='ending-date'
            name='endingDate'
            type='date'
            onChange={(e) => handleChange(e, setDatesOfStatement)}
          />
        </label>
        <Button
          addClassName='form-button'
          onClickFunction={checkIncome}
        >
          Consultar faturamento
        </Button>
      </form>
      {renderStatement &&
        <table>
          <thead>
            <tr>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalIncome}</td>
            </tr>
          </tbody>
        </table>}
      <Button
        id='go-back-button'
        onClickFunction={() => navigate('/')}
      >
        Voltar
      </Button>
    </main>
  );
}

export default Statement;
