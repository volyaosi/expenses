import { ExpenseRecord } from './ExpenseRecord'
import { render, screen } from '@testing-library/react'

describe('ExpenseRecord', () => {
    it('true shpuld be true', () => {
        expect(true).toBe(true)
    })

    it('should render', () => {
        render(<ExpenseRecord category="Home" amount={1} index={1} />)
        expect(screen.getByText('Home')).toBeTruthy()
    })
})
