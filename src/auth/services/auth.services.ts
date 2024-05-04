// auth.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user-dto';
import { LoginUserDto } from '../dtos/login-user-dto';

@Injectable()
export class AuthService {
  private users: any[] = []; // For demonstration purposes, you can replace this with your database integration

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if the email is already registered
    const existingUser = this.users.find(user => user.email === createUserDto.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create a new user
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  async signIn(loginUserDto: LoginUserDto): Promise<any> {
    // Find the user by email and password (for demonstration purposes, you should hash and compare passwords securely)
    const user = this.users.find(
      u => u.email === loginUserDto.email && u.password === loginUserDto.password
    );
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  }
}
