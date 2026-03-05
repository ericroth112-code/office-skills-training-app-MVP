import type { Lesson, Exercise } from "@shared/schema";

export const MOCK_LESSONS: Lesson[] = [
  {
    id: "lesson-1",
    title: "Оффисын нэр томьёо",
    description: "Албан байгууллага, оффисын орчинд түгээмэл ашиглагддаг үг хэллэг, тэдгээрийн утга санааг зөв ойлгож хэрэглэх.",
    icon: "Briefcase",
    items: [
      {
        id: "item-1",
        title: "Албан бичиг",
        shortDescription: "Байгууллагын үйл ажиллагаатай холбоотой албан ёсны баримт бичиг."
      },
      {
        id: "item-2",
        title: "Төрийн албан хаагч",
        shortDescription: "Төрийн байгууллагад ажиллаж, төрийн зорилт, чиг үүргийг хэрэгжүүлэгч."
      }
    ],
    exercises: [
      {
        id: "ex-1-1",
        title: "Би хэн бэ?",
        type: "identity_guess",
        instructions: "Доорх тодорхойлолтыг уншаад ямар албан тушаалтан болохыг таана уу.",
        question: "Би байгууллагын хүний нөөцийн бодлогыг тодорхойлж, ажилтан сонгон шалгаруулах, сургаж хөгжүүлэх үүрэгтэй. Би хэн бэ?",
        options: [
          { id: "opt-1", text: "Гүйцэтгэх захирал" },
          { id: "opt-2", text: "Хүний нөөцийн менежер" },
          { id: "opt-3", text: "Оффисын менежер" },
          { id: "opt-4", text: "Хуулийн зөвлөх" }
        ],
        correctAnswer: "opt-2",
        explanation: "Хүний нөөцийн менежер нь байгууллагын ажилтнуудтай холбоотой бүхий л үйл явцыг удирддаг."
      },
      {
        id: "ex-1-2",
        title: "Тодорхойлолт эвлүүлэх",
        type: "definition_matching",
        instructions: "Дараах үгсийг зөв дараалалд оруулж 'Албан тоот' гэдэг үгийн тодорхойлолтыг гаргана уу.",
        question: "Албан тоот гэж юу вэ?",
        options: [
          { id: "w1", text: "албан ёсны" },
          { id: "w2", text: "Байгууллагаас" },
          { id: "w3", text: "бичиг юм" },
          { id: "w4", text: "гаргасан" }
        ],
        correctAnswer: ["w2", "w4", "w1", "w3"], // Байгууллагаас гаргасан албан ёсны бичиг юм
        explanation: "Албан тоот гэдэг нь байгууллагаас гаргасан албан ёсны бичиг юм."
      }
    ]
  },
  {
    id: "lesson-2",
    title: "Хуулийн кейс",
    description: "Хөдөлмөрийн харилцаа болон байгууллагын эрх зүйн орчинд гардаг нийтлэг маргаан, кейсүүд дээр ажиллах.",
    icon: "Scale",
    items: [
      {
        id: "item-2-1",
        title: "Хөдөлмөрийн гэрээ",
        shortDescription: "Ажил олгогч болон ажилтны хооронд байгуулах албан ёсны гэрээ."
      }
    ],
    exercises: [
      {
        id: "ex-2-1",
        title: "Хөдөлмөрийн гэрээний хугацаа",
        type: "identity_guess",
        instructions: "Кейсийг уншаад зөв хариултыг сонгоно уу.",
        question: "Батаа компанитай хөдөлмөрийн гэрээ байгуулахдаа туршилтын хугацааг 6 сараар тохиролцжээ. Хөдөлмөрийн тухай хуулиар туршилтын хугацаа дээд тал нь хэдэн сар байж болох вэ?",
        options: [
          { id: "opt-1", text: "1 сар" },
          { id: "opt-2", text: "3 сар" },
          { id: "opt-3", text: "6 сар" },
          { id: "opt-4", text: "Хязгааргүй" }
        ],
        correctAnswer: "opt-2",
        explanation: "Хөдөлмөрийн тухай хуульд зааснаар туршилтын хугацаа нь 3 сараас илүүгүй байна."
      }
    ]
  },
  {
    id: "lesson-3",
    title: "Баримт бичгийн бүрдэл",
    description: "Албан хэрэг хөтлөлтийн стандарт, баримт бичгийн бүрдлүүдийг зөв боловсруулах.",
    icon: "FileText",
    items: [
      {
        id: "item-3-1",
        title: "Өргөдөл гомдол",
        shortDescription: "Иргэдээс төрийн болон төрийн бус байгууллагад гаргах хүсэлт."
      }
    ],
    exercises: [
      {
        id: "ex-3-1",
        title: "Бүтцийн дараалал",
        type: "definition_matching",
        instructions: "Өргөдөл бичих ерөнхий дарааллыг зөв байрлуулна уу.",
        question: "Өргөдлийн бүтэц",
        options: [
          { id: "p1", text: "Гарын үсэг, огноо" },
          { id: "p2", text: "Өргөдлийн утга санаа" },
          { id: "p3", text: "Өргөдөл гаргагчийн мэдээлэл" },
          { id: "p4", text: "Хэнд хандаж буй гарчиг" }
        ],
        correctAnswer: ["p4", "p3", "p2", "p1"],
        explanation: "Өргөдөл нь эхлээд хэнд хандаж байгаагаа бичээд, дараа нь өөрийн мэдээлэл, утга санаагаа илэрхийлээд төгсгөлд нь огноо, гарын үсгээр баталгаажуулдаг."
      }
    ]
  }
];

// Helper functions for mock data retrieval
export const getLessonById = (id: string): Lesson | undefined => {
  return MOCK_LESSONS.find(l => l.id === id);
};

export const getExerciseById = (lessonId: string, exerciseId: string): Exercise | undefined => {
  const lesson = getLessonById(lessonId);
  return lesson?.exercises.find(e => e.id === exerciseId);
};
