import { useState } from 'react'
import CategorySelector from '../categorySelector/CategorySelector'

export module CategoryList {
    export const create = () => {
        return [
            'Housing',
            'Transportation',
            'Food',
            'Utilities',
            'Insurance',
            'Medical',
            'Investing',
        ]
    }
}
