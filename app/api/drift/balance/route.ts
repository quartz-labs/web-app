import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        
        const response = await axios.get('https://api.quartzpay.io/drift/balance', {
            params: Object.fromEntries(searchParams)
        })
        
        return NextResponse.json(response.data, { status: response.status })
    } catch (error: any) {
        return NextResponse.json(
            {
                message: 'Error fetching health data',
                error: error.message
            },
            { status: error.response?.status || 500 }
        )
    }
}