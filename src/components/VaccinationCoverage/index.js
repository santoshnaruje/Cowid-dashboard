// Write your code here
import {BarChart, Legend, XAxis, YAxis, Bar} from 'recharts'

const VaccinationByCoverage = props => {
  const {name} = props

  const DataFormatter = number => `${number}k`

  return (
    <div className="card">
      <h1>Vaccination Coverage</h1>

      <BarChart width={1000} height={500} data={name}>
        <XAxis
          dataKey="vaccine_date"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 100,
          }}
        />
        <Bar dataKey="dose_1" name="Dose1" fill="#1f77b4" barSize="20%" />
        <Bar dataKey="dose_2" name="Dose2" fill="#fd7f0e" barSize="20%" />
      </BarChart>
    </div>
  )
}
export default VaccinationByCoverage
