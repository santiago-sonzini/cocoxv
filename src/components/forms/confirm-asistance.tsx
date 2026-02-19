// "use client";

// import { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
// // import {
// //   create_guests,
// //   sendAttendeeConfirmationEmail,
// //   sendCompanionsConfirmationEmail,
// // } from "@/app/actions/guests";

// import { FormContactInfoSchema } from "./form-contact-info";
// import { toast } from "../ui/use-toast";
// import { LoadingSpinner } from "../loading";
// import { set } from "date-fns";
// import { m } from "framer-motion";

// const GuestSchema = z.object({
//   name: z.string().min(1, "Requerido"),
//   lastname: z.string().min(1, "Requerido"),
//   email: z.string().optional(), // Email no se valida aquí directamente
//   phone: z.string().optional(),
//   hasDietRestriction: z.boolean().optional(),
//   dietRestrictionComment: z.string().optional(),
// });

// export const RSVPFormSchema = z
//   .object({
//     guests: z.array(GuestSchema).min(1),
//     comments: z.string().optional(),
//   })
//   .superRefine((data, ctx) => {
//     const firstGuest = data.guests[0];

//     if (!firstGuest.email) {
//       ctx.addIssue({
//         path: ["guests", 0, "email"],
//         message: "El email es requerido para el primer invitado.",
//         code: z.ZodIssueCode.custom,
//       });
//     } else {
//       const emailValidation = z
//         .string()
//         .email({ message: "Ingresa un correo válido." });
//       const result = emailValidation.safeParse(firstGuest.email);

//       if (!result.success) {
//         ctx.addIssue({
//           path: ["guests", 0, "email"],
//           message: result.error.errors[0].message,
//           code: z.ZodIssueCode.custom,
//         });
//       }
//     }

//     if (!firstGuest.phone) {
//       ctx.addIssue({
//         path: ["guests", 0, "phone"],
//         message: "El teléfono es requerido para el primer invitado.",
//         code: z.ZodIssueCode.custom,
//       });
//     } else {
//       // Basic phone validation - you can adjust the regex pattern as needed
//       const phoneValidation = z.string().regex(/^[\+]?[0-9\s\-\(\)]{10,}$/, {
//         message: "Ingresa un teléfono válido.",
//       });
//       const result = phoneValidation.safeParse(firstGuest.phone);

//       if (!result.success) {
//         ctx.addIssue({
//           path: ["guests", 0, "phone"],
//           message: result.error.errors[0].message,
//           code: z.ZodIssueCode.custom,
//         });
//       }
//     }
//   });

// export default function RSVPForm({
//   companion,
//   emailcompanion,
//   event_id,
//   color,
//   textColor,
//   event_name,
//   confirmDate,
// }: {
//   companion?: boolean;
//   emailcompanion?: boolean;
//   event_id: string;
//   color: string;
//   textColor: string;
//   event_name: string;
//   confirmDate: Date;
// }) {
//   const [isHovered, setIsHovered] = useState(false);

//   const [messsage, setMessage] = useState("");
//   const form = useForm({
//     resolver: zodResolver(RSVPFormSchema),
//     defaultValues: {
//       guests: [
//         {
//           name: "",
//           lastname: "",
//           email: "",
//           phone: "",
//           hasDietRestriction: false,
//           dietRestrictionComment: "",
//         },
//       ],
//       comments: "",
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "guests",
//   });

//   const addGuest = () => {
//     append({
//       name: "",
//       lastname: "",
//       email: "",
//       phone: "",
//       hasDietRestriction: false,
//       dietRestrictionComment: "",
//     });
//   };

//   const removeGuest = () => {
//     if (fields.length > 1) remove(fields.length - 1);
//   };

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (data: z.infer<typeof RSVPFormSchema>) => {
//     setLoading(true);
//     const today = new Date();
//     if (confirmDate.getTime() < today.getTime()) {
//       toast({
//         title: "Error al confirmar su asistencia",
//         description: "El tiempo para confirmar su asistencia ha expirado",
//         variant: "destructive",
//       });
//       setTimeout(() => {
//         setMessage("");
//       }, 3000);
//       return;
//     }

//     try {
//       console.log("🚀 ~ RSVPForm ~ data:", data);
//       const res = await create_guests({
//         guests_info: data,
//         event_id: event_id,
//       });
//       console.log("🚀 ~ RSVPForm ~ res:", res);

//       if (res.status === 200) {
//         const message = await sendAttendeeConfirmationEmail(
//           res.data,
//           event_name
//         );
//         // const companionMessage = await sendCompanionsConfirmationEmail(
//         //   res.data,
//         //   event_name
//         // );

//         toast({
//           title: "¡Gracias por confirmar su asistencia!",
//           description: message,
//         });
//         setMessage("¡Gracias por confirmar su asistencia!");

//         setTimeout(() => {
//           setMessage("");
//         }, 15000);

//         form.reset();
//       } else {
//         setMessage("Error al confirmar su asistencia");
//         toast({
//           title: "Error al confirmar su asistencia",
//           description: "Por favor, inténtelo de nuevo.",
//           variant: "destructive",
//         });
//         setTimeout(() => {
//           setMessage("");
//         }, 3000);
//       }
//     } catch (error) {
//       console.log("🚀 ~ RSVPForm ~ error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 font-sans">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit((data) => handleSubmit(data))}
//           style={{ backgroundColor: color, color: textColor }}
//           className="space-y-6 "
//         >
//           {fields.map(
//             (field, index) =>
//               true && (
//                 <div key={field.id} className="space-y-4">
//                   {index > 0 && <hr className="my-6" />}

//                   <div className="flex gap-4">
//                     <FormField
//                       control={form.control}
//                       name={`guests.${index}.name`}
//                       render={({ field }) => (
//                         <FormItem className="flex-1">
//                           <FormLabel>Nombre *</FormLabel>
//                           <FormControl>
//                             <Input
//                               style={{
//                                 backgroundColor: color,
//                                 borderColor: textColor,
//                               }}
//                               className="text-white font-myriad bg-black border-gray-600"
//                               placeholder=""
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name={`guests.${index}.lastname`}
//                       render={({ field }) => (
//                         <FormItem className="flex-1">
//                           <FormLabel>Apellido *</FormLabel>
//                           <FormControl>
//                             <Input
//                               style={{
//                                 backgroundColor: color,
//                                 borderColor: textColor,
//                               }}
//                               className="text-white bg-black border-gray-600"
//                               placeholder=""
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   {(index === 0 || emailcompanion) && (
//                     <div className="flex gap-4">
//                       <FormField
//                         control={form.control}
//                         name={`guests.${index}.email`}
//                         render={({ field }) => (
//                           <FormItem className="flex-1">
//                             <FormLabel>Email {index === 0 && <span className="text-red-500">*</span>}</FormLabel>
//                             <FormControl>
//                               <Input
//                                 style={{
//                                   backgroundColor: color,
//                                   borderColor: textColor,
//                                 }}
//                                 className="text-white bg-black border-gray-600"
//                                 placeholder=""
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name={`guests.${index}.phone`}
//                         render={({ field }) => (
//                           <FormItem className="flex-1">
//                             <FormLabel className="text-nowraps">
//                               Celular {index === 0 && <span className="text-red-500">*</span>}
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 style={{
//                                   backgroundColor: color,
//                                   borderColor: textColor,
//                                 }}
//                                 className="text-white bg-black border-gray-600"
//                                 placeholder=""
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   )}

//                   <FormField
//                     control={form.control}
//                     name={`guests.${index}.hasDietRestriction`}
//                     render={({ field }) => (
//                       <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <Checkbox
//                             style={{
//                               backgroundColor: color,
//                               borderColor: textColor,
//                             }}
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                             className="mt-1 border-gray-600 checked:bg-white data-[state=checked]:text-[#0f214c] data-[state=checked]:bg-white "
//                           />
//                         </FormControl>
//                         <FormLabel className="text-sm font-normal leading-relaxed">
//                           ¿Tiene alguna restricción alimentaria?{" "}
//                         </FormLabel>
//                       </FormItem>
//                     )}
//                   />

//                   {form.watch(`guests.${index}.hasDietRestriction`) && (
//                     <FormField
//                       control={form.control}
//                       name={`guests.${index}.dietRestrictionComment`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-normal">
//                             Por favor, deje un comentario sobre su restricción
//                             dietética o alergia
//                           </FormLabel>
//                           <FormControl>
//                             <Textarea
//                               placeholder=""
//                               {...field}
//                               style={{
//                                 backgroundColor: color,
//                                 borderColor: textColor,
//                               }}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   )}
//                 </div>
//               )
//           )}

//           {
//             companion && (
//               <div className="flex items-center gap-4 py-4">
//             <span className="font-medium">¿Viene acompañado?</span>
//             <div className="flex items-center  rounded-full px-1 py-1">
//               <button
//                 type="button"
//                 disabled={fields.length === 1}
//                 onClick={removeGuest}
//                 className="text-base px-2 py-0 border-2  hover:border-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 -
//               </button>
//               <span className="px-3 font-medium">{fields.length - 1}</span>
//               <button
//                 type="button"
//                 onClick={addGuest}
//                 className="text-base px-2 py-0 border-2 hover:border-gray-100 rounded-md"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//             )
//           }

//           <FormField
//             control={form.control}
//             name="comments"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Comentarios o preguntas</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     style={{ backgroundColor: color, borderColor: textColor }}
//                     placeholder=""
//                     {...field}
//                     className="min-h-24"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="pt-4">
//             <button
//               disabled={loading || messsage.trim() !== ""}
//               type="submit"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               style={{
//                 color: isHovered ? color : textColor,
//                 backgroundColor: isHovered ? textColor : color,
//                 borderColor: textColor,
//               }}
//               className="px-8 text-center flex justify-center border-2 font-bold rounded-md py-2 text-base w-full transition-all"
//             >
//               {loading ? <LoadingSpinner /> : messsage.trim() || "Enviar"}
//             </button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }
