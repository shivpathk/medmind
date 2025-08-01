// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { User } from '@/models/User';

// POST: Register a new user (admin or doctor)
export async function POST(req: Request) {
  try {
    await connectToDB();
    const { name, phone, email, password, role } = await req.json();

    if (!name || !phone || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }


    const newUser = await User.create({
      name,
      phone,
      email,
      password: password,
      role: role || 'doctor',
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('[USER_REGISTER_ERROR]', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
