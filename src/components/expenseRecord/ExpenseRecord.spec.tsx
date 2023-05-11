import { ExpenseRecord } from './ExpenseRecord'
import { render, screen } from '@testing-library/react'

describe('ExpenseRecord', () => {
    it('should render', () => {
        render(<ExpenseRecord category="Home" amount={1} index={1} />)
        expect(screen.getByText('Home')).toBeTruthy()
    })
})
