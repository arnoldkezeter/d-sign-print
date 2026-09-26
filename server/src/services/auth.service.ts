import bcrypt from "bcryptjs";
import type { IUserRepository } from "@/interfaces/repositories/IUserRepository.js";
import type { LoginDTO, CreateUserDTO, SafeUser, AuthTokenPayload } from "@/types/auth.types.js";
import { UnauthorizedError, BadRequestError } from "@/utils/AppError.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "@/utils/jwt.js";
import { env } from "@/config/env.js";
import type { UserDocument } from "@/models/User.model.js";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async login(dto: LoginDTO): Promise<TokenPair & { user: SafeUser }> {
    const user = await this.userRepository.findByEmail(dto.email, true);

    if (!user || !user.isActive) {
      throw new UnauthorizedError("Email ou mot de passe incorrect");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Email ou mot de passe incorrect");
    }

    const payload: AuthTokenPayload = { userId: user.id, role: user.role };

    return {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
      user: this.toSafeUser(user),
    };
  }

  async refresh(refreshToken: string): Promise<TokenPair> {
    let payload: AuthTokenPayload;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError("Session expirée, veuillez vous reconnecter");
    }

    // On revérifie que l'utilisateur existe toujours et est actif
    // (protège contre un refresh token valide mais utilisateur désactivé/supprimé entre-temps)
    const user = await this.userRepository.findById(payload.userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedError("Compte introuvable ou désactivé");
    }

    const newPayload: AuthTokenPayload = { userId: user.id, role: user.role };

    return {
      accessToken: signAccessToken(newPayload),
      refreshToken: signRefreshToken(newPayload), // rotation : nouveau refresh token à chaque fois
    };
  }

  async register(dto: CreateUserDTO): Promise<SafeUser> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestError("Un utilisateur avec cet email existe déjà");
    }

    const hashedPassword = await bcrypt.hash(dto.password, env.BCRYPT_SALT_ROUNDS);
    const user = await this.userRepository.create({ ...dto, password: hashedPassword });

    return this.toSafeUser(user);
  }

  async listUsers(): Promise<(SafeUser & { isActive: boolean; createdAt: Date })[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => ({ ...this.toSafeUser(user), isActive: user.isActive, createdAt: user.createdAt }));
  }

  async setUserActive(id: string, isActive: boolean): Promise<SafeUser> {
    const user = await this.userRepository.setActive(id, isActive);
    if (!user) throw new BadRequestError("Utilisateur introuvable");
    return this.toSafeUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) throw new BadRequestError("Utilisateur introuvable");
  }

  private toSafeUser(user: UserDocument): SafeUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}