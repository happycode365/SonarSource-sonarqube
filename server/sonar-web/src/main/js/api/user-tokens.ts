/*
 * SonarQube
 * Copyright (C) 2009-2024 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { getJSON, post, postJSON } from '../helpers/request';
import { throwGlobalError } from '../sonar-aligned/helpers/error';
import { NewUserToken, UserToken } from '../types/token';

/** List tokens for given user login */
export function getTokens(login: string): Promise<UserToken[]> {
  return getJSON('/api/user_tokens/search', { login }).then((r) => r.userTokens, throwGlobalError);
}

export function generateToken(data: {
  name: string;
  projectKey?: string;
  type?: string;
  login?: string;
  expirationDate?: string;
}): Promise<NewUserToken> {
  return postJSON('/api/user_tokens/generate', data).catch(throwGlobalError);
}

export function revokeToken(data: { name: string; login?: string }) {
  return post('/api/user_tokens/revoke', data).catch(throwGlobalError);
}
