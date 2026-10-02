import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .min(6, "Numero di telefono troppo corto")
  .max(20, "Numero di telefono troppo lungo")
  .regex(/^[+0-9][0-9\s().-]*$/, "Numero di telefono non valido");

export const signupInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Inserisci il tuo nome")
    .max(100, "Nome troppo lungo"),
  lastName: z
    .string()
    .trim()
    .min(2, "Inserisci il tuo cognome")
    .max(100, "Cognome troppo lungo"),
  email: z
    .string()
    .trim()
    .email("Indirizzo email non valido")
    .max(255, "Email troppo lunga"),
  phone: phoneSchema,
  experience: z.enum(["principiante", "intermedio", "avanzato"]),
  markets: z
    .array(z.enum(["azioni", "forex", "cripto", "materie_prime", "indici"]))
    .min(1, "Seleziona almeno un mercato")
    .max(5),
  goal: z.enum(["profitti", "protezione", "apprendimento", "automazione"]),
});

export type SignupInput = z.infer<typeof signupInputSchema>;

// Opaque sb_ keys aren't JWTs: send only apikey, never the default
// Authorization bearer.
function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const createSignup = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => signupInputSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    // Insert-only grant for the public role: generate the id ourselves and
    // skip the post-insert read-back, which would need SELECT access.
    const id = crypto.randomUUID();
    const { error } = await supabase.from("signups").insert({
      id,
      name: data.name,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      experience: data.experience,
      markets: data.markets,
      goal: data.goal,
    });
    if (error) {
      throw new Error("Registrazione non riuscita");
    }
    return { id };
  });

// Reads a single signup by its unguessable UUID for the personalized
// confirmation page. The row is not publicly listable (anon has insert-only
// access), so this narrow by-id lookup through the admin client stays safe.
export const getSignup = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => ({ id: z.string().uuid().parse(data.id) }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("signups")
      .select("id, name, last_name, experience, markets, goal")
      .eq("id", data.id)
      .maybeSingle();
    return row ?? null;
  });
