import 'package:app/screens/NestedForms/NestedForm.dart';
import 'package:app/screens/form/FormDetailsPage.dart';
import 'package:app/utils/MainPageBox/MainPageBoxOne.dart';
import 'package:app/utils/MainPageBox/SelectedPageFormBox.dart';
import 'package:app/utils/MainPageBox/SelectedPageFormSecondBox.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../ViewFilledData/FilledData.dart';

class SelectedFormsPage extends StatefulWidget {
  final String formId;
  final String formTitle;
  final String promoterId;
  const SelectedFormsPage({
    super.key,
    required this.formId,
    required this.formTitle,
    required this.promoterId,
  });

  @override
  State<SelectedFormsPage> createState() => _SelectedFormsPageState();
}

class _SelectedFormsPageState extends State<SelectedFormsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios_new,
            color: Colors.grey,
            size: 18,
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text(
          widget.formTitle,
          style: GoogleFonts.poppins(
            fontSize: 16,
            color: Colors.white,
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: Colors.black,
      ),
      backgroundColor: Colors.black,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => FormDetailsPage(
                            promoterId: widget.promoterId,
                            formId: widget.formId,
                          ),
                        ),
                      );
                    },
                    child: Mainpageboxone(
                      title: "Fill Form",
                      icon: Icons.edit_calendar_outlined,
                    ),
                  ),
                ),
                SizedBox(width: 10), // Space between buttons
                Expanded(
                  child: GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => FormDataScreen(
                            formId: widget.formId,
                          ),
                        ),
                      );
                    },
                    child: Mainpageboxone(
                      title: "View Data",
                      icon: Icons.table_chart_rounded,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ViewAllNestedForms(
                      formId: widget.formId,
                      promoterId: widget.promoterId,
                    ),
                  ),
                );
              },
              child: SelectedPageFormSecondBox(formId: widget.formId),
            ),
          ],
        ),
      ),
    );
  }
}
